const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");
const { startKeeper, getKeepers, getKeeper } = require("./modules/Keepers");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
    wallets: () => getWallets(),
    keepers: () => getKeepers(),
    keeper: (_, { id }) => getKeeper(1),
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
