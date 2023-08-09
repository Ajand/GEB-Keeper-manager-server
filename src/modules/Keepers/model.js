const mongoose = require("mongoose");

const KeeperSchema = mongoose.Schema(
  {
    system: {
      type: "string",
      required: true,
    },
    network: {
      type: "string",
      required: true,
    },
    collateral: {
      type: "string",
      required: true,
    },
    wallet: {
      type: "string",
      required: true,
    },
    status: {
      type: "string",
      default: "idle",
      enum: [
        "idle",
        "preparing",
        "running",
        "failed",
        "stopped",
        "stopping",
        "recovering",
      ],
    },
    options: {
      type: ["string"],
    },
    containerId: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

const Keeper = mongoose.model("keeper", KeeperSchema);

const createKeeper = ({ system, network, collateral, wallet, options }) => {
  const keeper = new Keeper({
    system,
    network,
    collateral,
    wallet,
    options,
  });
  return keeper.save();
};

const setContainerId = () => {};

const getNotStoppedKeepers = () => {
  return new Promise(async (resolve, reject) => {
    Keeper.find({ status: { $ne: "stopped" } })
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const getKeepers = () => {
  return new Promise((resolve, reject) => {
    return Keeper.find({})
      .then((r) => resolve(r))
      .catch((err) => reject(err));
  });
};

const getKeeper = (_id) => {
  return new Promise(async (resolve, reject) => {
    return Keeper.findOne({ _id })
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
      setContainerId,
    },
    queries: { getKeepers, getKeeper, getNotStoppedKeepers },
  },
};
