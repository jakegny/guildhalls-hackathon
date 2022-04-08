const Identity = artifacts.require("Identity");
const Guild = artifacts.require("Guild");
const Membership = artifacts.require("Membership");
const WorkContract = artifacts.require("WorkContract");
const WorkContractFactory = artifacts.require("WorkContractFactory");

module.exports = function (deployer) {
  // deployer.deploy(Identity);
  // deployer.deploy(Guild);
  // deployer.deploy(Membership);
  deployer.deploy(WorkContractFactory);
  // deployer.deploy(WorkContract);
};
