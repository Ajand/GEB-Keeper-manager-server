const mongoose = require("mongoose");

const LogSchema = mongoose.Schema(
  {
    keeperId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    message: {
      type: "string",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    variant: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("log", LogSchema);

// keeperId

const saveLog = ({ keeperId, message, variant, date }) => {
  const log = new Log({
    keeperId,
    message,
    variant,
    date,
  });
  return log.save();
};

const getKeeperLog = (keeperId) => {
  return Log.find({ keeperId })
    .then((r) => r)
    .catch((err) => err);
};
// log

module.exports = {
  methods: {
    queries: {
      getKeeperLog,
    },
    commands: {
      saveLog,
    },
  },
};
