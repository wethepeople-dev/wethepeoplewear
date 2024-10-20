require('dotenv').config();
const { db } = require('@vercel/postgres');

async function testConnection() {
    const client = await db.connect();

    try {
        await client.sql`SELECT NOW()`;
        console.log('Database connection successful!');
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        await client.end();
    }
}

testConnection();
