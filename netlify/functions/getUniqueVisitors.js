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
    if (!isConnected) {
      await client.connect();
      isConnected = true;
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
    console.error('Error in getUniqueVisitors:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};