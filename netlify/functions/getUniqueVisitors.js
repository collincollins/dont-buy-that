// netlify/functions/getUniqueVisitors.js

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    console.log("Function 'getUniqueVisitors' invoked.");

    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB.");
    }

    const database = client.db('dontbuythat');
    const visitorsCollection = database.collection('visitors');

    // Count the unique visitors
    const uniqueVisitorCount = await visitorsCollection.countDocuments();

    return {
      statusCode: 200,
      body: JSON.stringify({ count: uniqueVisitorCount }),
    };
  } catch (error) {
    console.error('Error in getUniqueVisitors function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};