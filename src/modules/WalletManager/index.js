const { generateKeyPassFile } = require("./keyfileManager");

const generateNewWallet = (password) => {
  const address = generateKeyPassFile(password);

  return address;
};

module.exports = {
  generateNewWallet,
};
