const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");
const { startKeeper } = require("./modules/Keepers");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
    wallets: () => getWallets(),
  },
  Mutation: {
    generateNewWallet: (_, { password }) => {
      return generateNewWallet(password);
    },
    startKeeper: (_, { keeper, wallet, network, system, flashSwap }) => {
      return startKeeper({ keeper, wallet, network, system, flashSwap });
    },
  },
};

module.exports = resolvers;
