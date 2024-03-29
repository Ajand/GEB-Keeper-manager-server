const networks = {
  mainnet: {
    rpc_uri:
      "https://eth-mainnet.g.alchemy.com/v2/fofIceaXnmzL3CXlsVXKqM2jFavXIoTk",
  },
  goerli: {
    rpc_uri:
      "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT",
  },
};

const systems = [
  {
    name: "RAI",
    image: "reflexer/auction-keeper",
    networks: [
      {
        name: "Mainnet",
        nativeCoin: "ETH",
        systemCoin: "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919",
        collaterals: [
          {
            name: "ETH-A",
            address: "0x0000000000000000000000000000000000000000",
          },
        ],
      },
    ],
  },
  {
    name: "TAI",
    image: "tai-keeper",
    networks: [
      {
        name: "Mainnet",
        nativeCoin: "ETH",
        systemCoin: "0xf915110898d9a455ad2da51bf49520b41655ccea",
        collaterals: [
          {
            name: "ETH-A",
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          },
          {
            name: "ETH-B",
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          },
          {
            name: "ETH-C",
            address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          },
          {
            name: "WSTETH-A",
            address: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
          },
          {
            name: "WSTETH-B",
            address: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0",
          },
          {
            name: "RETH-A",
            address: "0xae78736cd615f374d3085123a210448e74fc6393",
          },
          {
            name: "RETH-B",
            address: "0xae78736cd615f374d3085123a210448e74fc6393",
          },
          {
            name: "RAI-A",
            address: "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
          },
        ],
      },
      {
        name: "Goerli",
        nativeCoin: "GoerliETH",
        systemCoin: "0x752001fd47365d7fb84a5fdb0b3212f56d5ee4e0",
        collaterals: [
          {
            name: "ETH-A",
            address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          },
          {
            name: "ETH-B",
            address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          },
          {
            name: "ETH-C",
            address: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
          },
          {
            name: "WSTETH-A",
            address: "0xf000322855db5f20e1702b136b2845cc7addd25f",
          },
          {
            name: "WSTETH-B",
            address: "0xf000322855db5f20e1702b136b2845cc7addd25f",
          },
          {
            name: "RETH-A",
            address: "0x6a41a5856f2cf481fcf84610de6a90e3fb57d514",
          },
          {
            name: "RETH-B",
            address: "0x6a41a5856f2cf481fcf84610de6a90e3fb57d514",
          },
          {
            name: "RAI-A",
            address: "0x8c96beb6a913945107730f85acef21c240c21985",
          },
        ],
      },
    ],
  },
];

const getSystems = () => {
  return systems;
};

module.exports = {
  networks,
  systems,
  getSystems,
};
