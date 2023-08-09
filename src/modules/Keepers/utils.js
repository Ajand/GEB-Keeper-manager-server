const path = require("path");
const fs = require("fs");
const { toChecksumAddress } = require("ethereum-checksum-address");

const getPathAndFileNames = (keeperId) => {
  const serverRoot = path.join(__dirname, "..", "..", "..");
  const walletPath = path.join(serverRoot, "wallets");
  const containersPath = path.join(serverRoot, "containers");

  if (!fs.existsSync(containersPath)) {
    fs.mkdirSync(containersPath);
  }

  const cidFileName = path.join(containersPath, `./cid-${keeperId}`);
  const logsFileName = path.join(containersPath, `./${keeperId}.logs`);
  if (!fs.existsSync(logsFileName)) {
    fs.writeFileSync(logsFileName, "");
  }

  return {
    serverRoot,
    walletPath,
    containersPath,
    cidFileName,
    logsFileName,
  };
};

const getRunningContainerArray = ({
  walletPath,
  image,
  cidFileName,
  rpcUri,
  wallet,
  collateral,
  options,
}) => {
  // TODO: must add options to this
  return [
    "run",
    "-v",
    `${walletPath}:/keystore`,
    "--cidfile",
    cidFileName,
    image,
    "--rpc-uri",
    rpcUri,
    "--safe-engine-system-coin-target",
    "ALL",
    "--eth-from",
    toChecksumAddress(wallet),
    "--eth-key",
    `key_file=/keystore/key-${wallet.toLowerCase()}.json,pass_file=/keystore/${wallet.toLowerCase()}.pass`,
    "--collateral-type",
    collateral,
    ...options.map((option) => `--${option}`),
  ];
};

module.exports = {
  getPathAndFileNames,
  getRunningContainerArray,
};
