const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_URL = process.env.DATABASE_URL;

const databaseConfig = {
  devDbConnectionString: `mongodb://${DATABASE_HOST}/${DATABASE_NAME}`,
  proDbConnectionString: DATABASE_URL,
};

module.exports = {
  databaseConfig,
};
