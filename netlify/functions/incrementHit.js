// netlify/functions/incrementHit.js

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Ensure the client connects only once
let isConnected = false;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
      console.log('Connected to MongoDB');
    }

    const database = client.db('dontbuythat');
    const hitsCollection = database.collection('hits');

    const hit = await hitsCollection.findOneAndUpdate(
      { _id: 'hitCounter' },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ count: hit.value.count }),
    };
  } catch (error) {
    console.error('Error in incrementHit function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};