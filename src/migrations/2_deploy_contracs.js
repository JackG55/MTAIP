const MTAIP = artifacts.require("MTAIP.sol");
const Marketplace = artifacts.require("Marketplace.sol");
const UserRegister = artifacts.require("UserRegister.sol");

module.exports = function (deployer) {
  deployer.deploy(MTAIP);
  deployer.deploy(Marketplace);
  deployer.deploy(UserRegister);
};
