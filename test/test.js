"use strict";

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const HuglaSimpleMongo = require('./../index.js');

let testApp;

describe("HuglaSimpleMongo", function() {

  beforeEach(function() {
    testApp = {
      config: {
        mongoUrl: "mongodb://localhost:27017/test"
      },
      registerLaunchAction: function() {

      },
      registerShutdownAction: function() {

      }
    };
  });

  it("should call app#registerLaunchAction() method", function() {
    testApp.registerLaunchAction = sinon.spy();
    const simpleMongo = new HuglaSimpleMongo(testApp);
    expect(testApp.registerLaunchAction).to.have.been.called;
  });

  it("should call app#registerShutdownAction() method", function() {
    testApp.registerShutdownAction = sinon.spy();
    const simpleMongo = new HuglaSimpleMongo(testApp);
    expect(testApp.registerShutdownAction).to.have.been.called;
  });

  describe("#connect()", function() {
    it("should call the callback without error", function(done) {
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        expect(err).to.not.exist;
        done();
      });
    });

    it("should call the callback with error in case of no config",
    function(done) {
      testApp.config.mongoUrl = null;
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        expect(err).to.be.instanceOf(Error);
        done();
      });
    });

    it("should set mongodb object on provided app", function(done) {
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        expect(testApp.mongodb).to.be.object;
        done();
      });
    });
  });

  describe("#close()", function() {
    it("should call the callback without error", function(done) {
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        simpleMongo.close(function(err) {
          expect(err).to.not.exist;
          done();
        });
      });
    });
  });

  describe("#collection()", function() {
    it("should call the callback without error",
    function() {
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        simpleMongo.collection("test", function(err, collection) {
          expect(err).to.not.exist;
          done();
        });
      });
    });

    it("should call the callback with collection object",
    function() {
      const simpleMongo = new HuglaSimpleMongo(testApp);
      simpleMongo.connect(function(err) {
        simpleMongo.collection("test", function(err, collection) {
          expect(collection).to.be.object;
          done();
        });
      });
    });
  });
});
