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

  type Query {
    networks: [Network!]!
  }
`;

module.exports = typeDefs;
