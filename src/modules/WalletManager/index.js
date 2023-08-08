const { generateKeyPassFile } = require("./keyfileManager");
const { methods } = require("./model");

const generateNewWallet = async (privateKey, password) => {
  const address = await generateKeyPassFile(privateKey, password);
  return address;
};

const getWallets = () => {
  return methods.queries.getWallets();
};

module.exports = {
  generateNewWallet,
  getWallets,
};
