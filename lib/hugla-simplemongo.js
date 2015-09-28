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
   * @param {object} config Configuration object
   * @param {object} config.mongoUrl mongodb connection url
   * @param {function} callback Callback function, will get db object as a second argument on success
   */
  constructor(config, callback) {
    const log = this.log = new HuglaLogger({ module: 'simplemongo' });

    MongoClient.connect(config.mongoUrl, function (err, db) {
      if (err) {
        log.error("error connecting to mongodb");
        callback(err);
        return;
      }

      log.info("connected to mongodb");

      this.db = db;
      callback(null, db);
    }.bind(this));
  }

  /**
   *
   * @param {string} name Collection name
   * @param {function} callback Callback function that will be called when collection is ready
   */
  collection(name, callback) {
    this.db.collection(name, callback);
  }
}