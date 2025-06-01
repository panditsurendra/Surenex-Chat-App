const mongoose = require('mongoose');

// connect to the database using mongoose
mongoose.connect(process.env.CONN_STRING);

// connection state
const db = mongoose.connection;

// checking the db connection 
db.on('connected', () => {
    console.log('Database connected successfully');
});

db.on('error', (error) => {
    console.error('Database connection error:', error);
});

module.exports = db; 