const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
    connectionLimit: 15, // Maximum number of connections
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ro'
});

// Handle connection errors
pool.on('connection', (connection) => {
    console.log('New connection established with ID:', connection.threadId);
});

pool.on('acquire', (connection) => {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
});

// Handle error events
pool.on('error', (err) => {
    console.error('Unexpected error on idle connection:', err);
    process.exit(1);
});

// Export the pool for use in other parts of the application
module.exports = pool;
