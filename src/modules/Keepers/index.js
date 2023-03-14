const runKeeper = require("./runKeeper");

const startKeeper = ({ wallet }) => {
  runKeeper(wallet);
  return "done";
};

module.exports = {
  startKeeper,
};
