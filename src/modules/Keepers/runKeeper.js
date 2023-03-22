const { spawn } = require("child_process");
const { toChecksumAddress } = require("ethereum-checksum-address");
const path = require("path");
const { methods } = require("./model");
const { getLogsQueue } = require("../LogManager");

const runKeeper = ({ keeperId, wallet, system, network }) => {
  const walletPath = path.join(__dirname, "..", "..", "..", "wallets");
  const logsQueue = getLogsQueue();

  const container = spawn("docker", [
    "run",
    "-v",
    `${walletPath}:/keystore`,
    "peakaw/auction-keeper",
    "--rpc-uri",
    network.rpc_uri,
    "--eth-from",
    toChecksumAddress(wallet),
    "--eth-key",
    `key_file=/keystore/key-${wallet.toLowerCase()}.json,pass_file=/keystore/${wallet.toLowerCase()}.pass`,
    "--graph-endpoints",
    system.graph_endpoint,
  ]);

  container.stdout.on("data", (data) => {
    //logModel.methods.commands.saveLog(keeperId, data);
    logsQueue.add(data);
    // logsQueue.console.log(`stdout: ${data}`);
  });

  container.stderr.on("data", (data) => {
    //logModel.methods.commands.saveLog(keeperId, data);
    logsQueue.add({ message: `${data}`, date: new Date(), keeperId });
    // console.error(`stderr: ${data}`);
  });

  container.on("exit", (r) => {
    methods.commands.changeKeeperStatus(keeperId, "exited");
  });
};

module.exports = runKeeper;
