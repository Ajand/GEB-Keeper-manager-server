const { spawn, exec } = require("child_process");
const { methods } = require("./model");
const fs = require("fs");

const { getPathAndFileNames, getRunningContainerArray } = require("./utils");

const stopKeeper = async ({ keeperId }, alertService) => {
  const { walletPath, cidFileName, logsFileName } =
    getPathAndFileNames(keeperId);

  const keeper = await methods.queries.getKeeper(keeperId);
  await methods.commands.changeKeeperStatus(keeperId, "stopping");
  alertService.sendMessage(`Stopping the keeper
  \n Keeper ID: ${keeperId}        
   \n Wallet: ${keeper.wallet}
  \n System: ${keeper.system}
   \n Network: ${keeper.network}
    \n Collateral: ${keeper.collateral} 
    \n =======================================

`);
  const containerId = fs.readFileSync(cidFileName).toString();
  exec(`docker stop ${containerId}`, async (error, stdout, stderr) => {
    if (error) {
      return;
    }
  });
};

const runKeeper =
  (recoverKeeper, inputTries = 0, alertService) =>
  async ({ keeperId, wallet, image, rpcUri, collateral, options }) => {
    let tries = inputTries;

    const { walletPath, cidFileName, logsFileName } =
      getPathAndFileNames(keeperId);

    let container;

    if (fs.existsSync(cidFileName)) {
      const keeper = await methods.queries.getKeeper(keeperId);

      if (inputTries > 0) {
        await methods.commands.changeKeeperStatus(keeperId, "recovering");
      } else {
        await methods.commands.changeKeeperStatus(keeperId, "preparing");
      }

      const containerId = fs.readFileSync(cidFileName).toString();

      container = spawn("docker", ["start", "-a", containerId]);
    } else {
      await methods.commands.changeKeeperStatus(keeperId, "preparing");

      container = spawn(
        "docker",
        getRunningContainerArray({
          walletPath,
          cidFileName,
          rpcUri,
          wallet,
          collateral,
          options,
          image,
        })
      );
    }

    console.log(
      getRunningContainerArray({
        walletPath,
        cidFileName,
        rpcUri,
        wallet,
        collateral,
        options,
        image,
      })
    );

    let haveSetLogs = false;

    const setLogsFile = async (logs) => {
      if (!haveSetLogs && fs.existsSync(cidFileName)) {
        const containerId = fs.readFileSync(cidFileName).toString();
        const keeper = await methods.queries.getKeeper(keeperId);

        if (keeper.status !== "stopping") {
          //if (keeper.status !== "running") {
          //  alertService.sendMessage(`Keeper is running
          //  \n Keeper ID: ${keeperId}
          //   \n Wallet: ${keeper.wallet}
          //  \n System: ${keeper.system}
          //   \n Network: ${keeper.network}
          //    \n Collateral: ${keeper.collateral}
          //    \n =======================================
          //`);
          //}
          await methods.commands.changeKeeperStatus(keeperId, "running");
        }

        exec(
          `docker logs -f ${containerId} >& ${logsFileName}`,
          (error, stdout, stderr) => {
            if (error) {
              return;
            }
            haveSetLogs = true;
          }
        );
      }
    };

    container.stdout.on("data", (data) => {
      console.log(data.toString());
      setLogsFile(data);
    });

    container.stderr.on("data", (data) => {
      console.log(data.toString());
      setLogsFile(data);
    });

    container.on("exit", async (r) => {
      const keeper = await methods.queries.getKeeper(keeperId);
      console.log(keeper);
      if (keeper.status !== "stopping") {
        await methods.commands.changeKeeperStatus(keeperId, "failed");
        recoverKeeper(
          { keeperId, wallet, image, rpcUri, collateral, options },
          tries + 1
        );
        /*alertService.sendMessage(`Keeper is recovering ( tries: ${tries + 1})
        \n Keeper ID: ${keeperId}        
         \n Wallet: ${keeper.wallet}
        \n System: ${keeper.system}
         \n Network: ${keeper.network}
          \n Collateral: ${keeper.collateral} 
          \n =======================================

      `);*/
      } else if (keeper.status === "stopping") {
        await methods.commands.changeKeeperStatus(keeperId, "stopped");
        alertService.sendMessage(`Keeper is stopped
        \n Keeper ID: ${keeperId}        
         \n Wallet: ${keeper.wallet}
        \n System: ${keeper.system}
         \n Network: ${keeper.network}
          \n Collateral: ${keeper.collateral} 
          \n =======================================

      `);
      }
      console.log("exited");
    });
  };

module.exports = { runKeeper, stopKeeper };
