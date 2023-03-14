const { spawn } = require("child_process");
const { toChecksumAddress } = require("ethereum-checksum-address");
const path = require("path");
const { methods } = require("./model");
const logModel = require("../LogManager/model");

const runKeeper = (keeperId, wallet) => {
  const walletPath = path.join(__dirname, "..", "..", "..", "wallets");

  const container = spawn("docker", [
    "run",
    "-v",
    `${walletPath}:/keystore`,
    "peakaw/auction-keeper",
    "--rpc-uri",
    "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56",
    "--eth-from",
    toChecksumAddress(wallet),
    "--eth-key",
    `key_file=/keystore/key-${wallet.toLowerCase()}.json,pass_file=/keystore/${wallet.toLowerCase()}.pass`,
    "--graph-endpoints",
    "https://subgraph-goerli.tai.money/subgraphs/name/tai",
  ]);

  container.stdout.on("data", (data) => {
    logModel.methods.commands.saveLog(keeperId, data);
    console.log(`stdout: ${data}`);
  });

  container.stderr.on("data", (data) => {
    logModel.methods.commands.saveLog(keeperId, data);
    console.error(`stderr: ${data}`);
  });

  container.on("exit", (r) => {
    methods.commands.changeKeeperStatus(keeperId, "exited");
  });
};

module.exports = runKeeper;
