const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema(
  {
    address: {
      type: "string",
      required: true,
    },
    usages: [
      {
        network: "string",
        system: "string",
      },
    ],
    inUseOf: {
      network: "string",
      system: "string",
    },
    networkBalances: [
      {
        network: "string",
        amount: "string",
      },
    ],
    systemBalances: [
      {
        network: "string",
        system: "string",
        amount: "string",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("wallet", WalletSchema);

const saveWallet = (address) => {
  const wallet = new Wallet({ address });
  return wallet.save();
};

const getWallets = () => {
  return new Promise((resolve, reject) => {
    return Wallet.find()
      .then((wallets) => resolve(wallets))
      .catch((err) => reject(err));
  });
};

const setInUse = (address, network, system) => {
  return Wallet.updateOne({ address }, { $set: { network, system } });
};

module.exports = {
  collection: Wallet,
  methods: {
    queries: {
      getWallets,
    },
    commands: {
      saveWallet,
      setInUse,
    },
  },
};
