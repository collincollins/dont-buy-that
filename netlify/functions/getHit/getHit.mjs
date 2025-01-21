// netlify/functions/getHit.js

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    await client.connect();
    const database = client.db('dontbuythat');
    const hitsCollection = database.collection('hits');

    const hit = await hitsCollection.findOne({ _id: 'hitCounter' });

    const count = hit ? hit.count : 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
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