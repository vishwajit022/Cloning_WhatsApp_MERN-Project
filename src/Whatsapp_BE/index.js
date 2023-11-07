// Import necessary libraries and modules
import express from "express"; // Import the Express.js framework
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import morgan from "morgan"; // Import morgan for HTTP request logging
import helmet from "helmet"; // Import helmet for security-related HTTP headers
import mongoSanitize from "express-mongo-sanitize"; // Import express-mongo-sanitize for NoSQL injection prevention
import cookieParser from "cookie-parser"; // Import cookie-parser for parsing cookies
import compression from "compression"; // Import compression for response compression
import fileUpload from "express-fileupload"; // Import express-fileupload for handling file uploads
import cors from "cors"; // Import cors for Cross-Origin Resource Sharing
import createHttpError from "http-errors"; // Import http-errors for creating HTTP error objects
import routes from "./routes/index.js"; // Import your custom routes
import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions
import winston from "winston"; // Import Winston for logging

dotenv.config(); // Load environment variables from a .env file (if present)

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the server's port based on environment variable or default to 3000

// Logger configuration
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    ],
    format: winston.format.combine(
        winston.format.timestamp(), // Include timestamp in logs
        winston.format.json() // Log in JSON format
    ),
});

// Middleware setup
app.use(morgan("dev")); // Use morgan for request logging in "dev" format
app.use(helmet()); // Use helmet for enhancing security by setting various HTTP headers
app.use(express.json()); // Parse JSON data in request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data in request bodies with extended option
app.use(mongoSanitize()); // Sanitize user inputs to prevent NoSQL injection
app.use(cookieParser()); // Parse cookies in the request headers
app.use(compression()); // Compress responses for better performance
app.use(fileUpload({ useTempFiles: true })); // Handle file uploads and store temporary files
app.use(cors({ origin: 'http://localhost:2000' })); // Enable CORS for requests from a specific origin

// Handle GET requests to the root path
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>"); // Respond with a simple HTML message
});

// Use custom routes for paths starting with "/api/v1"
app.use("/api/v1", routes);

// Handle POST requests to the root path
app.post("/", (req, res) => {
    res.send("POST request received!"); // Respond with a message
});

// MongoDB Connection
const { DATABASE_URL } = process.env; // Extract MongoDB connection URI from environment variables

mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        logger.info('Connected to MongoDB'); // Log successful MongoDB connection
    })
    .catch((error) => {
        logger.error('Failed to connect to MongoDB:', error); // Log MongoDB connection failure
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// Start the server and listen on the specified port
const server = app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}`); // Log server startup message
    logger.info("Process ID: " + process.pid); // Log the process ID
});

// Exit handlers for gracefully shutting down the server
const exitHandler = () => {
    if (server) {
        logger.info("Server is closing...");
        server.close(() => {
            logger.info("Server closed"); // Log server closure
            process.exit(0); // Exit the process gracefully
        });
    } else {
        process.exit(0); // Exit the process if server is not available
    }
};

// Handle uncaught exceptions and unhandled promise rejections
process.on("uncaughtException", (err) => {
    logger.error('Uncaught exception:', err); // Log uncaught exceptions
    exitHandler(); // Handle the exception and exit the process
});

process.on("unhandledRejection", (err) => {
    logger.error('Unhandled promise rejection:', err); // Log unhandled promise rejections
    exitHandler(); // Handle the rejection and exit the process
});

// Error handling middleware for handling custom and internal errors
app.use((err, req, res, next) => {
    logger.error(err.message); // Log the error message
    res.status(err.status || 500).send({ // Send an error response with appropriate status code and message
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

// Sample route for testing errors - It throws a BadRequest error
app.post("/err", (req, res) => {
    throw createHttpError.BadRequest("This route has an error");
});

// Default route for handling undefined routes
app.use((req, res, next) => {
    next(createHttpError.NotFound("This Route Doesn't Exist")); // Forward the request to error handling middleware with a NotFound error
});