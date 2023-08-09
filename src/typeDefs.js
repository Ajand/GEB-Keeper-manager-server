const typeDefs = `#graphql
  type Network {
    id: Int!
    rpc_uri: String
    name: String!
    systems: [System!]!
  }

  type Wallet {
    _id: ID!
    address: String!
    usages: [WalletUsage!]!
    networkBalances: [NetworkBalance!]!
    systemBalances: [SystemBalance!]!
  }

  type WalletUsage {
    network: String!
    system: String!
  }

  type NetworkBalance {
    network: String!
    amount: String!
  }

  type SystemBalance {
    network: String!
    system: String!
    amount: String!
  }

  type Keeper {
    _id: ID!
    collateral: String!
    network: String!
    system: String!
    wallet: String!
    status: String!
    options: [String!]!
    logs: String!
  }

  type Log {
    message: String!
    variant: String!
    date: String!
  }
  
  type Collateral {
    name: String!
    address: String!
  }
  
  type SystemNetwork {
    name: String!
    nativeCoin: String!
    systemCoin: String!
    collaterals: [Collateral!]!
  }
  
  type System {
    name: String!
    networks: [SystemNetwork!]!
  }

  type Query {
    networks: [Network!]!
    wallets: [Wallet!]!
    keepers: [Keeper!]!
    keeper(id: ID!): Keeper
    systems: [System!]!
  }

  type Mutation {
    generateNewWallet(password: String!): String!
    startKeeper(
      system: String!
      network: String!
      collateral: String!
      privateKey: String!
      options: [String!]!
    ): Keeper!
    changeKeeperStatus(keeperId: ID!): String
  }
`;

module.exports = typeDefs;
