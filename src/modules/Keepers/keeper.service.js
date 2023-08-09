const { runKeeper, stopKeeper } = require("./container.service");
const Wallet = require("../WalletManager");
const { networks, systems } = require("../Systems");
const { methods } = require("./model");

const randomPassword = "somerandompassword";

const KeeperService = (alertService) => {
  console.log(alertService);

  const start = async ({
    system,
    network,
    collateral,
    privateKey,
    options,
  }) => {
    const password = randomPassword;
    const wallet = await Wallet.generateNewWallet(privateKey, password);

    try {
      const keeperDoc = await methods.commands.createKeeper({
        system,
        network,
        collateral,
        wallet,
        options,
      });
      const rpcUri = networks[network.toLowerCase()].rpc_uri;
      const systemImage = systems.find((sys) => sys.name === system).image;
      alertService.sendMessage(
        `New keeper created. 
        \n Keeper ID: ${keeperDoc._id} 
        \n Wallet: ${keeperDoc.wallet}
         \n System: ${keeperDoc.system}
          \n Network: ${keeperDoc.network}
           \n Collateral: ${keeperDoc.collateral} 
            ${
              !!keeperDoc.options.length
                ? `\nOptions:  ${keeperDoc.options.join(", ")} `
                : ""
            }
        \n =======================================
        `
      );
      run({
        keeperId: keeperDoc._id,
        wallet,
        image: systemImage,
        rpcUri,
        options,
        collateral,
      });
      return keeperDoc;
    } catch (err) {
      throw err;
    }
  };

  const stop = (keeperId) => {
    stopKeeper({ keeperId }, alertService);
  };

  const changeKeeperState = async (keeperId) => {
    const keeper = await methods.queries.getKeeper(keeperId);
    if (keeper.status === "failed" || keeper.status === "stopped") {
      const { wallet, system, network, collateral, options } = keeper;

      const rpcUri = networks[network.toLowerCase()].rpc_uri;
      const image = systems.find((sys) => sys.name === system).image;

      run({ keeperId, wallet, image, rpcUri, options, collateral });
    } else if (keeper.status === "running") {
      stop(keeperId);
    }
  };

  const run = async (
    { keeperId, wallet, image, rpcUri, collateral, options },
    tries = 0
  ) => {
    await runKeeper(
      recoverKeeper(10),
      tries,
      alertService
    )({
      keeperId,
      wallet,
      image,
      rpcUri,
      collateral,
      options,
    });
  };

  const recoverKeeper =
    (maxTries = 10) =>
    ({ keeperId, wallet, image, rpcUri, collateral, options }, tries = 0) => {
      console.log(
        `trying to recover keeper: ${keeperId} for the ${tries} time.`
      );
      if (tries >= maxTries) {
        console.log(
          `KeeperGiving up on recovering keeper: ${keeperId} after failed ${tries} tries.`
        );
        alertService.sendMessage(`Keeper Failed. Giving up on recovering the keeper after ${tries} tries
        \n Keeper ID: ${keeperId}        
         \n Wallet: ${wallet}
          \n =======================================
      `);
        return;
      }

      // run keeper
      run({ keeperId, wallet, image, rpcUri, collateral, options }, tries);

      // try it again until max tries
    };

  const recoverAll = async (maxTries = 10) => {
    // find all not stopped keepers
    // recover them all

    const neededToRecoverKeepers = await methods.queries.getNotStoppedKeepers();

    neededToRecoverKeepers
      .map((keeper) => keeper._id)
      .forEach(async (keeperId) => {
        const keeper = await methods.queries.getKeeper(keeperId);
        const { wallet, system, network, collateral, options } = keeper;
        const rpcUri = networks[network.toLowerCase()].rpc_uri;
        const image = systems.find((sys) => sys.name === system).image;
        run({ keeperId, wallet, image, rpcUri, options, collateral });
      });
  };

  const getKeeperBalances = () => {
    // getKeeperNativeBalance
    // get keeper system coin balance
    // get keeper collateral balance
    // get keeper joined system coin balance
    // get keeper collateral balances
  };

  const getTransactionType = () => {};

  const saveTransaction = () => {};

  const getKeeperTransactions = () => {
    // get keeper address transactions
    // save transactions that are not saved
    // return keeper transactions
  };

  const filterKeeperTransactions = (transactions) => {
    // filter keeper transactions into, 'bids', 'liquidations', 'settlements'
  };

  const getTotalBoughtCollateral = (bids) => {
    // calculate the total bought collateral from bids
  };

  const getTotalSystemCoinSpent = (bids) => {
    // calculate the total system coin bidded from bids
  };

  const getKeeperMetrics = () => {
    // Promise.all[getKeeperBalances, getTotalBoughtCollateral, getTotalSystemCoinSpent]
  };

  const getKeeperLogs = () => {};

  return {
    start,
    stop,
    getKeeperMetrics,
    filterKeeperTransactions,
    getKeeperTransactions,
    getKeeperBalances,
    getKeeperLogs,
    recoverKeeper,
    recoverAll,
    changeKeeperState,
  };
};

module.exports = KeeperService;
