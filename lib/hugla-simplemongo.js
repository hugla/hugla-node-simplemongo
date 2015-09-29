"use strict";

const MongoClient = require('mongodb').MongoClient;

const HuglaLogger = require('hugla-logger');

/**
 * HuglaSimpleMongo - Hugla web framework's simple mongodb connection module
 */
class HuglaSimpleMongo {

  /**
   * Class constructor
   *
   * @param {object} app Hugla app
   * @param {object} app.config Configuration object
   * @param {object} app.config.mongoUrl mongodb connection url
   * @param {function} app.registerLaunchAction
   * @param {function} app.registerShutdownAction
   */
  constructor(app) {
    this.log = new HuglaLogger({ module: 'simplemongo' });
    this.app = app;
    this.config = app.config;

    app.registerLaunchAction(this.connect.bind(this));
    app.registerShutdownAction(this.close.bind(this));
  }

  /**
   * Connect to mongodb
   *
   * @param {function} callback Function to be called on completion
   */
  connect(callback) {
    if (!this.config.mongoUrl) {
      process.nextTick(function() {
        callback(new Error("no `mongoUrl` in config"));
      });
      return;
    }

    MongoClient.connect(this.config.mongoUrl, function (err, db) {
      if (err) {
        this.log.error("error connecting to mongodb");
        callback(err);
        return;
      }

      this.log.info("connected to mongodb");
      this.db = db;
      this.app.mongodb = this;
      callback();
    }.bind(this));
  }

  /**
   * Close the connection
   *
   * @param {function} callback Function to be called on completion
   */
  close(callback) {
    if (this.db) {
      this.db.close(this.config.mongoForceClose, callback);
    } else {
      process.nextTick(function() {
        callback();
      });
    }
  }

  /**
   * Fetch collection with given name
   *
   * @param {string} name Collection name
   * @param {function} callback Callback function that will be called when collection is ready
   */
  collection(name, callback) {
    this.db.collection(name, callback);
  }
}

module.exports = HuglaSimpleMongo;
