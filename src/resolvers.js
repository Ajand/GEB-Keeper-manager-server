const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");
const { startKeeper, getKeepers, getKeeper } = require("./modules/Keepers");
const { getSystems } = require('./modules/Systems')

const resolvers = {
  Query: {
    networks: () => getNetworks(),
    wallets: () => getWallets(),
    keepers: async () => {
      const keepers = await getKeepers();
      return keepers;
    },
    keeper: (_, { id }) => getKeeper(id),
    systems: () => getSystems()
  },
  Mutation: {
    generateNewWallet: (_, { password }) => {
      return generateNewWallet(password);
    },
    startKeeper: (_, params) => {
      const { system, network, collateral, privateKey, options } = params;
      return startKeeper({ system, network, collateral, privateKey, options });
    },
  },
};

module.exports = resolvers;
