const express = require('express');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/registration');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use registration routes
app.use('/api', registrationRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
