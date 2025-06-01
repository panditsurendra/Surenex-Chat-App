
const dotenv = require('dotenv'); // Imports the dotenv module as an object with methods like dotenv.config()
dotenv.config({path : './config.env'}); // Load environment variables from .env file
// dotenv.config should be called before importing the app module 

const dbconfig = require('./config/dbConfig'); 


/*
const app = require('./app'); // Import the app module to initialize it and here we do not give .js extension as it is optional 
// app is an object that has been exported from app.js

const port = process.env.PORT_NUMBER || 3000; // Get the port from environment variables or use 3000 as default
// process.env is an object that contains all the environment variables
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/



const server = require('./app'); 

const port = process.env.PORT_NUMBER || 3000; 
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

