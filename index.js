const systemStartup = require("./src");

systemStartup();

//const { spawn } = require("child_process");

/*function runContainer() {
  const command = `docker run -it \
    -v /Users/ajand/Projects/reflexer/keystore:/keystore \
    peakaw/auction-keeper \
    --rpc-uri https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56 \
    --eth-from 0x0a6Ba6e7C9397A01D9d91612bd63B6322a707256 \
    --eth-key "key_file=/keystore/0a6ba6e7c9397a01d9d91612bd63b6322a707256.json" \
    --safe-engine-system-coin-target ALL \
    --keep-system-coin-in-safe-engine-on-exit \
    --keep-collateral-in-safe-engine-on-exit \
    --block-check-interval 1 \
    --bid-only \
    --bid-check-interval 4 \
    --graph-endpoints https://subgraph-goerli.tai.money/subgraphs/name/tai`;

  const container = spawn("docker", ["run", "-d", "peakaw/auction-keeper"]);

  container.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  container.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  container.on("close", (code) => {
    console.log(`Docker container started with code ${code}`);
    const logs = spawn("docker", ["logs", "-f", container.id]);
    logs.stdout.on("data", (data) => {
      // Process the logs here
      console.log(`Container logs: ${data}`);
    });
    logs.stderr.on("data", (data) => {
      console.error(`Error retrieving logs: ${data}`);
    });
  });
}*/

//function runContainer() {
//  const container = spawn("docker", [
//    "run",
//    "-v",
//    "/Users/ajand/Projects/reflexer/keystore:/keystore",
//    "peakaw/auction-keeper",
//    "--rpc-uri",
//    "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56",
//    "--eth-from",
//    "0x0a6Ba6e7C9397A01D9d91612bd63B6322a707256",
//    "--eth-key",
//    "key_file=/keystore/0a6ba6e7c9397a01d9d91612bd63b6322a707256.json,pass_file=/keystore/aaa.pass",
//    "--graph-endpoints",
//    "https://subgraph-goerli.tai.money/subgraphs/name/tai",
//  ]);
//  container.stdout.on("data", (data) => {
//    console.log(`stdout: ${data}`);
//  });
//
//  let sented = false;
//
//  container.stderr.on("data", (data) => {
//    console.error(`stderr: ${data}`);
//    if (!sented) {
//      container.stdin.write("console.log('Hello!');\n");
//      container.stdin.end(); // EOF
//      sented = true;
//    }
//  });
//}
//
//runContainer();
