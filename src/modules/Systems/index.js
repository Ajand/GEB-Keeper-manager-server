const networks = {
    mainnet: {
        rpc_uri: "https://eth-mainnet.g.alchemy.com/v2/PKDcpW-zo09u7KieHzUl5H0qujGgr5nv"
    },
    goerli: {
        rpc_uri: "https://goerli.infura.io/v3/7a3ae98793214e75b0686d31b7fa2c56"
    }
}

const systems = [{
    name: "RAI",
    image: 'reflexer/auction-keeper',
    networks: [
        {
            name: "Mainnet",
            nativeCoin: "ETH",
            systemCoin: '0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919',
            collaterals: [
                {
                    name: "ETH-A",
                    address: '0x0000000000000000000000000000000000000000'
                }
            ]
        },
    ]
}, {
    name: "TAI",
    image: 'tai-keeper',
    networks: [
        {
            name: "Goerli",
            nativeCoin: "GoerliETH",
            systemCoin: '0x752001fd47365d7fb84a5fdb0b3212f56d5ee4e0',
            collaterals: [
                {
                    name: "ETH-A",
                    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
                },
                {
                    name: "ETH-B",
                    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
                },
                {
                    name: "ETH-C",
                    address: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
                },
                {
                    name: "WSTETH-A",
                    address: '0xf000322855db5f20e1702b136b2845cc7addd25f'
                },
                {
                    name: "WSTETH-B",
                    address: '0xf000322855db5f20e1702b136b2845cc7addd25f'
                },
                {
                    name: "RETH-A",
                    address: '0x6a41a5856f2cf481fcf84610de6a90e3fb57d514'
                },
                {
                    name: "RETH-B",
                    address: '0x6a41a5856f2cf481fcf84610de6a90e3fb57d514'
                },
                {
                    name: "RAI-A",
                    address: '0x8c96beb6a913945107730f85acef21c240c21985'
                },
            ]
        },
    ]
}]

const getSystems = () => {
    return systems
}

module.exports = {
    networks,
    systems,
    getSystems
}