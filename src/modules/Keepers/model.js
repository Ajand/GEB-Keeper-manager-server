const mongoose = require("mongoose");

const KeeperSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    network: {
      type: "string",
      required: true,
    },
    system: {
      type: "string",
      required: true,
    },
    wallet: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      default: "running",
    },
    flashSwap: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Keeper = mongoose.model("keeper", KeeperSchema);

const createKeeper = ({ name, network, system, wallet, flashSwap }) => {
  const keeper = new Keeper({
    name,
    network,
    system,
    wallet,
    flashSwap,
  });
  return keeper.save();
};

const getKeepers = () => {
  return new Promise((resolve, reject) => {
    return Keeper.find({})
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const getKeeper = (id) => {
  return new Promise(async (resolve, reject) => {
    return Keeper.findOne({ id })
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const changeKeeperStatus = (_id, status) => {
  return Keeper.updateOne({ _id }, { $set: { status: status } })
    .then((r) => "done")
    .catch((err) => err);
};

module.exports = {
  collection: Keeper,
  methods: {
    commands: {
      changeKeeperStatus,
      createKeeper,
    },
    queries: { getKeepers, getKeeper },
  },
};
