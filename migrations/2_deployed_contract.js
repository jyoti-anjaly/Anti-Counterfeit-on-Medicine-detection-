const DetectionApp = artifacts.require("Detection.sol");

module.exports = function (deployer) {
  deployer.deploy(DetectionApp);
};
