// netlify/functions/incrementHit.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    await client.connect();
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
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};