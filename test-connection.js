// Simple MongoDB connection test
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Present' : 'Missing');
console.log('DB Name:', process.env.MONGODB_DB_NAME);

async function testConnection() {
  try {
    // Set legacy OpenSSL provider for compatibility
    process.env.NODE_OPTIONS = '--openssl-legacy-provider';
    
    // Connection options for Node.js v22 compatibility
    const options = {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      tls: true,
      tlsInsecure: true, // Allow self-signed certificates temporarily
    };
    
    const client = new MongoClient(process.env.MONGODB_URI, options);
    
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db(process.env.MONGODB_DB_NAME || 'encelyte');
    console.log('✅ Database selected');
    
    // Test a simple operation
    const result = await db.admin().ping();
    console.log('✅ Ping successful:', result);
    
    await client.close();
    console.log('✅ Connection closed');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();
