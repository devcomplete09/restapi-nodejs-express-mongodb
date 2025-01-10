const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGODB_URL || '';
const client = new MongoClient(connectionString);

const runDb = async () => {
  try {
    const connection = await client.connect();
    const db = connection.db('dev-complete');
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = runDb();