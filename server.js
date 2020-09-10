const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect DB
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Dev logging Middleware
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`));

// Handle unhandled promises
process.on('unhandledrejection', (err, promise) => {
    console.log(`Error ${err.message}`);

    // Close server and exit process
    server.close(() => process.exit(1));
})