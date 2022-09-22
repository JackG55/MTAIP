const KryptoBirdz = artifacts.require("KryptoBirdz");
const MTAIP = artifacts.require("MTAIP.sol");
const Marketplace = artifacts.require("Marketplace.sol");

module.exports = function (deployer) {
  deployer.deploy(MTAIP);
  deployer.deploy(Marketplace);
};
