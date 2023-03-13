const networks = require("./networks");

const getNetwork = (label) => {};

const getNetworks = () => {
  return networks.map((network) => ({
    ...network,
    systems: network.systems.map((system) => ({
      ...system,
      contracts: JSON.stringify(system.contracts),
    })),
  }));
};

const addNetwork = () => {};

const editNetwork = () => {};

const deleteNetwork = () => {};

const startup = () => {};

module.exports = {
  getNetwork,
  getNetworks,
  addNetwork,
  editNetwork,
  deleteNetwork,
  startup,
};
