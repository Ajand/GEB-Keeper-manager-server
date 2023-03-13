const { getNetworks } = require("./modules/NetworkManager");
const { generateNewWallet } = require("./modules/WalletManager");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
  },
  Mutation: {
    generateNewWallet: (_, { password }) => {
      return generateNewWallet(password);
    },
  },
};

module.exports = resolvers;
