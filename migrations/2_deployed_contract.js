const DetectionApp = artifacts.require("DetectionApp.sol");

module.exports = function (deployer) {
  deployer.deploy(DetectionApp);
};
