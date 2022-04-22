const sushiItem = artifacts.require("sushiItem");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(sushiItem)
};
