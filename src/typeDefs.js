const typeDefs = `#graphql
  type Network {
    id: Int!
    rpc_uri: String
    name: String!
    systems: [System!]!
  }

  type System {
    name: String!
    graph_endpoint: String
    contracts: String
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
    name: String!
    network: String!
    system: String!
    wallet: String!
    status: String!
    logs: [Log!]!
  }

  type Log {
    message: String!
  }

  type Query {
    networks: [Network!]!
    wallets: [Wallet!]!
    keepers: [Keeper!]!
    keeper(id: ID!): Keeper
  }

  type Mutation {
    generateNewWallet(password: String!): String!
    startKeeper(
      keeperName: String!
      wallet: String!
      network: String!
      system: String!
      flashSwap: Boolean!
    ): String!
  }
`;

module.exports = typeDefs;
