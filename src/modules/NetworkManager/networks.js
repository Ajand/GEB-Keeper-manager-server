const networks = [
  {
    id: 1,
    rpc_uri:
      "https://eth-mainnet.g.alchemy.com/v2/PKDcpW-zo09u7KieHzUl5H0qujGgr5nv",
    name: "Mainnet",
    systems: [
      {
        name: "RAI",
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
    id: 5,
    rpc_uri:
      "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT",
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
    ],
  },
];

module.exports = networks;
