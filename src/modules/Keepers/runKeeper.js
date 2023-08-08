const {spawn, exec} = require("child_process");
const {toChecksumAddress} = require("ethereum-checksum-address");
const path = require("path");
const {methods} = require("./model");
const {getLogsQueue} = require("../LogManager");
const fs = require("fs");

const runKeeper = ({keeperId, wallet, image, rpcUri, collateral, options}) => {
    const walletPath = path.join(__dirname, "..", "..", "..", "wallets");
    const containersPath = path.join(__dirname, "..", "..", "..", "containers");

    const cidFileName = path.join(containersPath, `./cid-${keeperId}`);

    const logsFileName = path.join(containersPath, `./${keeperId}.logs`);


    if (!fs.existsSync(containersPath)) {
        fs.mkdirSync(containersPath)
    }

    const logsQueue = getLogsQueue();

    console.log("run",
        "-v",
        `${walletPath}:/keystore`,
        image,
        "--rpc-uri",
        rpcUri,
        "--eth-from",
        toChecksumAddress(wallet),
        "--eth-key",
        `key_file=/keystore/key-${wallet.toLowerCase()}.json,pass_file=/keystore/${wallet.toLowerCase()}.pass`,
        "--collateral-type",
        collateral)

    const container = spawn("docker", [
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
        collateral
    ]);

    let haveSetLogs = false

    const setLogsFile = (logs) => {
        console.log(logs.toString(), 'coming from setLogsFile')
        if(!haveSetLogs) {
            const containerId = fs.readFileSync(cidFileName).toString()
            console.log(`docker logs -f ${containerId}, >& ${logsFileName}`)
            fs.writeFileSync(
                logsFileName,
                ''
            );
            exec(`docker logs -f ${containerId} >& ${logsFileName}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    return;
                }
                haveSetLogs = true
            })
        }
    }



    container.stdout.on("data", (data) => {
        setLogsFile(data)
        //logModel.methods.commands.saveLog(keeperId, data);
        //logsQueue.add(data);
        // logsQueue.console.log(`stdout: ${data}`);
        console.log(`${data}`)
    });

    container.stderr.on("data", (data) => {
        setLogsFile(data)

        //logModel.methods.commands.saveLog(keeperId, data);
        //logsQueue.add({message: `${data}`, date: new Date(), keeperId});
        // console.error(`stderr: ${data}`);
        console.log(`${data}`)
    });

    container.on("exit", (r) => {
        //methods.commands.changeKeeperStatus(keeperId, "exited");
        console.log('exited')
    });
};

module.exports = runKeeper;
