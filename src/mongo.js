const mongoose = require("mongoose");

// TODO db connector must refactored

const DB_NAME = "geb_keepers";

const connectDB = async () => {
  try {
    mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected", DB_NAME);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
