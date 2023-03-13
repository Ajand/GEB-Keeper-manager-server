const networks = [
  {
    id: 1,
    rpc_uri: "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56",
    name: "Mainnet",
    systems: [],
  },
  {
    id: 40,
    rpc_uri: "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56",
    name: "Goerli",
    systems: [
      {
        name: "Tai",
        graph_endpoint: "https://subgraph-goerli.tai.money/subgraphs/name/tai",
        contracts: {
          ETH_FROM: "0xe75b8a5ba47ca7458cbc4db1dd52df5e2ebc42cf",
          STARTING_BLOCK_NUMBER: 8125447,
          GEB_MULTISIG: "0x336281cb29d22914242edfc4467e1f458fb378c7",
          SURPLUS_AUCTION_RECEIVER:
            "0x0000000000000000000000000000000000000001",
        },
      },
      {
        name: "Rai",
        graph_endpoint: "https://subgraph-goerli.tai.money/subgraphs/name/tai",
        contracts: {
          ETH_FROM: "0xe75b8a5ba47ca7458cbc4db1dd52df5e2ebc42cf",
          STARTING_BLOCK_NUMBER: 8125447,
          GEB_MULTISIG: "0x336281cb29d22914242edfc4467e1f458fb378c7",
          SURPLUS_AUCTION_RECEIVER:
            "0x0000000000000000000000000000000000000001",
        },
      },
    ],
  },
  {
    id: 15,
    rpc_uri: "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56",
    name: "Optimism",
    systems: [
      {
        name: "Hai",
        graph_endpoint: "https://subgraph-goerli.tai.money/subgraphs/name/tai",
        contracts: {
          ETH_FROM: "0xe75b8a5ba47ca7458cbc4db1dd52df5e2ebc42cf",
          STARTING_BLOCK_NUMBER: 8125447,
          GEB_MULTISIG: "0x336281cb29d22914242edfc4467e1f458fb378c7",
          SURPLUS_AUCTION_RECEIVER:
            "0x0000000000000000000000000000000000000001",
        },
      },
    ],
  },
];

module.exports = networks;
