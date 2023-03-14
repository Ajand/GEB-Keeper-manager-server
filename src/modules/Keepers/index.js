const runKeeper = require("./runKeeper");
const { methods } = require("./model");

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
  runKeeper(keeper._id, wallet);

  return keeper._id;
};

const getKeepers = () => {
  return methods.queries.getKeepers();
};

const getKeeper = (id) => {
  return methods.queries.getKeeper(id);
};

module.exports = {
  startKeeper,
  getKeepers,
  getKeeper,
};
