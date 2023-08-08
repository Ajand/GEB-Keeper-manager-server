const runKeeper = require("./runKeeper");
const {methods} = require("./model");
const logModel = require("../LogManager/model");
const {getNetworks} = require("../NetworkManager");
const Wallet = require('../WalletManager')
const {networks, systems} = require('../Systems')
const fs = require('fs')
const path = require("path");


const password = "Somewierdpasswordcomeshere"


const startKeeper = async ({system, network, collateral, privateKey, options}) => {

    console.log(system, network, collateral, privateKey, options)

    const wallet = await Wallet.generateNewWallet(privateKey, password)

    try {
        const keeperDoc = await methods.commands.createKeeper({system, network, collateral, wallet, options})
        const rpcUri = networks[network.toLowerCase()].rpc_uri
        const systemImage = systems.find(sys => sys.name === system).image
        console.log(systemImage)
        runKeeper({keeperId: keeperDoc._id, wallet, image: systemImage, rpcUri, options, collateral})
    } catch (err) {
        console.log(err)
    }
    return keeperDoc

    /*const keeper = await methods.commands.createKeeper({
      name: keeperName,
      wallet,
      network,
      system,
      flashSwap,
    });
    const networks = getNetworks();

    const selectedNetwork = networks.find((net) => net.name === network);
    console.log("are we here?", selectedNetwork);

    const selectedSystem = selectedNetwork.systems.find(
      (sys) => sys.name === system
    );
    console.log("are we here?", selectedNetwork, selectedSystem);

    await Wallets.methods.commands.setInUse(wallet, network, system);

    runKeeper({
      keeperId: keeper._id,
      wallet,
      system: selectedSystem,
      network: selectedNetwork,
    });

    return keeper._id;*/
};

const getKeepers = async () => {
    const keepers = await methods.queries.getKeepers();

    const mappedKeepers = keepers.map(async (keeper) => {
        const containersPath = path.join(__dirname, "..", "..", "..", "containers");
        const logsFileName = path.join(containersPath, `./${keeper._id}.logs`);
        const logs = fs.existsSync(logsFileName) ? fs.readFileSync(logsFileName).toString() : ''
        return {
            ...keeper._doc,
            logs,
        };
    });

    const final = await Promise.all(mappedKeepers);

    return final;
};

const getKeeper = async (id) => {
    const keeper = await methods.queries.getKeeper(id);
    const containersPath = path.join(__dirname, "..", "..", "..", "containers");
    const logsFileName = path.join(containersPath, `./${keeper._id}.logs`);

    const logs = fs.existsSync(logsFileName) ? fs.readFileSync(logsFileName).toString() : ''

    return {
        ...keeper._doc,
        logs,
    };
};

module.exports = {
    startKeeper,
    getKeepers,
    getKeeper,
};
