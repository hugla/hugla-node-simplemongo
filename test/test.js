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

  });

  describe("#close()", function() {

  });

  describe("#collection()", function() {

  });
});