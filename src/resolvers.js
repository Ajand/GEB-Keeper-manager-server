const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");
const { startKeeper, getKeepers, getKeeper } = require("./modules/Keepers");
const { getSystems } = require("./modules/Systems");

const AlertService = require("./modules/Alert/alert.service");
const KeeperService = require("./modules/Keepers/keeper.service");

const resolverCreator = async () => {
  const alertService = await AlertService();

  const keeperService = KeeperService(alertService);

  await keeperService.recoverAll();

  return {
    Query: {
      networks: () => getNetworks(),
      wallets: () => getWallets(),
      keepers: async () => {
        const keepers = await getKeepers();
        return keepers;
      },
      keeper: (_, { id }) => getKeeper(id),
      systems: () => getSystems(),
    },
    Mutation: {
      generateNewWallet: (_, { password }) => {
        return generateNewWallet(password);
      },
      startKeeper: (_, params) => {
        const { system, network, collateral, privateKey, options } = params;
        //return startKeeper({
        //  system,
        //  network,
        //  collateral,
        //  privateKey,
        //  options,
        //});
        return keeperService.start({
          system,
          network,
          collateral,
          privateKey,
          options,
        });
      },
      changeKeeperStatus: async (_, { keeperId }) => {
        return keeperService.changeKeeperState(keeperId);
      },
    },
  };
};

module.exports = resolverCreator;
