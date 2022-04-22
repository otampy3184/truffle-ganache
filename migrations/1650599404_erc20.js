const erc20 = artifacts.require("ERC20");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  const name = "nihon-en";
  const symbol = "JPY"
  _deployer.deploy(erc20, name, symbol);
};
