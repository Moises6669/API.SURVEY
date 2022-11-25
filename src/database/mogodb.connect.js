const mongoose = require("mongoose");
const { databaseKeys } = require("../config/init");

require("../config/init").databaseConfig;

let connect;

if (process.env.NODE_ENV === "development")
  connect = databaseKeys.databaseConfig.devDbConnectionString;

if (process.env.NODE_ENV === "production")
  connect = databaseKeys.databaseConfig.proDbConnectionString;

mongoose.connect(connect, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
