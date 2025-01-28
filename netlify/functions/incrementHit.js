// netlify/functions/incrementHit.js

const { MongoClient, ServerApiVersion } = require('mongodb');
const crypto = require('crypto');

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
    }

    const database = client.db('dontbuythat');
    const hitsCollection = database.collection('hits');
    const visitorsCollection = database.collection('visitors');

    // Increment hit count
    const hitResult = await hitsCollection.findOneAndUpdate(
      { _id: 'hitCounter' },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: 'after' }
    );

    // Get visitor IP and hash it
    const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    const hashedIP = crypto.createHash('sha256').update(ip).digest('hex');

    // Check if the visitor already exists
    const existingVisitor = await visitorsCollection.findOne({ _id: hashedIP });
    if (!existingVisitor) {
      // Add the new visitor
      await visitorsCollection.insertOne({ _id: hashedIP, visitedAt: new Date() });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        hitCount: hitResult.value ? hitResult.value.count : 1,
      }),
    };
  } catch (error) {
    console.error('Error in incrementHit:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};