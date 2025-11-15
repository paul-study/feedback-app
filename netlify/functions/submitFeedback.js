const { Client } = require('pg');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    // Parse the request body
    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid request body' })
        };
    }
    
    // Validate required fields
    const { name, email, rating, feedback, timestamp } = data;
    if (!name || !email || !rating || !feedback) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required fields' })
        };
    }
    
    // Create PostgreSQL client (Neon database)
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    try {
        // Connect to database
        await client.connect();
        
        // Create table if it doesn't exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                rating INTEGER NOT NULL,
                feedback TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Insert feedback
        const query = `
            INSERT INTO feedback (name, email, rating, feedback, timestamp)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `;
        
        const values = [name, email, parseInt(rating), feedback, timestamp || new Date().toISOString()];
        const result = await client.query(query, values);
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Thank you for your feedback!',
                id: result.rows[0].id
            })
        };
        
    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to save feedback',
                details: error.message
            })
        };
    } finally {
        // Close database connection
        await client.end();
    }
};
