// netlify/functions/getHit.js

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
    console.log("Function 'getHit' invoked.");

    if (!isConnected) {
      console.log("Connecting to MongoDB...");
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB.");
    }

    const database = client.db('dontbuythat');
    const hitsCollection = database.collection('hits');

    const hit = await hitsCollection.findOne({ _id: 'hitCounter' });

    const count = hit ? hit.count : 0;

    console.log(`Retrieved hit count: ${count}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    };
  } catch (error) {
    console.error('Error in getHit function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};