const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");
const { startKeeper, getKeepers, getKeeper } = require("./modules/Keepers");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
    wallets: () => getWallets(),
    keepers: async () => {
      const keepers = await getKeepers();
      return keepers;
    },
    keeper: (_, { id }) => getKeeper(id),
  },
  Mutation: {
    generateNewWallet: (_, { password }) => {
      return generateNewWallet(password);
    },
    startKeeper: (_, { keeperName, wallet, network, system, flashSwap }) => {
      return startKeeper({ keeperName, wallet, network, system, flashSwap });
    },
  },
};

module.exports = resolvers;
