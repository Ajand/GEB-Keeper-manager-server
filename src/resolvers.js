const { getNetworks } = require("./modules/NetworkManager");

const resolvers = {
  Query: {
    networks: () => getNetworks(),
  },
};

module.exports = resolvers;
