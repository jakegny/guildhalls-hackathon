const Identity = artifacts.require("Identity");
const Guild = artifacts.require("Guild");
const Membership = artifacts.require("Membership");

module.exports = function (deployer) {
  deployer.deploy(Identity);
  // deployer.deploy(Guild);
  // deployer.deploy(Membership);
};
