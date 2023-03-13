const { generateKeyPassFile } = require("./keyfileManager");
const { methods } = require("./model");

const generateNewWallet = async (password) => {
  const address = generateKeyPassFile(password);
  await methods.commands.saveWallet(address);
  return address;
};

const getWallets = () => {
  return methods.queries.getWallets();
};

module.exports = {
  generateNewWallet,
  getWallets,
};
