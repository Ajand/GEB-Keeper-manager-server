const path = require("path");
const fs = require("fs");
const keythereum = require("keythereum");
const Wallet = require('ethereumjs-wallet').default

const generateKeyPassFile = async (privateKey, password) => {

  const privateKeyBuffer = Buffer.from(privateKey.substring(2), 'hex');

  const wallet = Wallet.fromPrivateKey(privateKeyBuffer)

  const keystore = await wallet.toV3String(password);


  const getFileName = (address) => `./key-${address}.json`;
  const passFileName = (address) => `./${address}.pass`;

  const walletPath = path.join(__dirname, "..", "..", "..", "wallets");
  const keyObject = JSON.parse(keystore)
  fs.mkdir(path.join(__dirname, "..", "..", "..", "wallets"), (err) => {
    fs.writeFileSync(
      path.join(walletPath, getFileName(keyObject.address)),
        keystore
    );

    fs.writeFileSync(
      path.join(walletPath, passFileName(keyObject.address)),
      password
    );
  });

  return keyObject.address;
};

module.exports = { generateKeyPassFile };
