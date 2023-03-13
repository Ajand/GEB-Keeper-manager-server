const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet, getWallets } = require("./modules/WalletManager");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
    wallets: () => getWallets(),
  },
  Mutation: {
    generateNewWallet: (_, { password }) => {
      return generateNewWallet(password);
    },
  },
};

module.exports = resolvers;
