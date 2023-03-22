const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const LogManager = require("./modules/LogManager");
LogManager.main();
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const connectDB = require("./mongo");

const systemStartup = async () => {
  console.log("Starting the system ...");

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Apollo server is running at ${url}`);
};

module.exports = systemStartup;
