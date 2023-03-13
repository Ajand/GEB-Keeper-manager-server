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

  type Query {
    networks: [Network!]!
    wallets: [Wallet!]!
  }

  type Mutation {
    generateNewWallet(password: String!): String!
  }
`;

module.exports = typeDefs;
