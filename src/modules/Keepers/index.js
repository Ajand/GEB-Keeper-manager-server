const runKeeper = require("./runKeeper");
const { methods } = require("./model");
const logModel = require("../LogManager/model");
const { getNetworks } = require("../NetworkManager");
const Wallets = require("../WalletManager/model");

const startKeeper = async ({
  keeperName,
  wallet,
  network,
  system,
  flashSwap,
}) => {
  const keeper = await methods.commands.createKeeper({
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

  return keeper._id;
};

const getKeepers = async () => {
  const keepers = await methods.queries.getKeepers();

  const mappedKeepers = keepers.map(async (keeper) => {
    const logs = await logModel.methods.queries.getKeeperLog(keeper._id);
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
  const logs = await logModel.methods.queries.getKeeperLog(keeper._id);

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
