const path = require("path");
const fs = require("fs");
const keythereum = require("keythereum");

const generateKeyPassFile = (password) => {
  const getFileName = (address) => `./key-${address}.json`;
  const passFileName = (address) => `./${address}.pass`;

  const walletPath = path.join(__dirname, "..", "..", "..", "wallets");
  const dk = keythereum.create();
  var keyObject = keythereum.dump(password, dk.privateKey, dk.salt, dk.iv);
  fs.mkdir(path.join(__dirname, "..", "..", "..", "wallets"), (err) => {
    fs.writeFileSync(
      path.join(walletPath, getFileName(keyObject.address)),
      JSON.stringify(keyObject)
    );

    fs.writeFileSync(
      path.join(walletPath, passFileName(keyObject.address)),
      password
    );
  });

  return keyObject.address;
};

module.exports = { generateKeyPassFile };
