const express = require('express');
const app = express();
const router = require('./router/router.js');
const databaseConnect = require('./config/databaseConfig.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Connect to the database
databaseConnect();

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(cookieParser());  // Parse cookies (for JWT token)
app.use(cors({
    origin: [process.env.CLIENT_URL],  // Allow requests from the client URL
    credentials: true  // Allow cookies to be sent
}));

// Define routes
app.use('/api/auth', router);

// Test route for '/' (can be removed after testing)
app.use('/', (req, res) => {
    res.status(200).json({
        data: "hello world!!!"
    });
});


module.exports = app;
