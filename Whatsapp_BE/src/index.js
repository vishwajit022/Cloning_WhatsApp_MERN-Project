import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev")); // Logging middleware
app.use(helmet()); // Helmet security middleware
app.use(express.json()); // JSON parsing middleware
app.use(express.urlencoded({ extended: true })); // URL-encoded data parsing middleware
app.use(mongoSanitize()); // Sanitize user inputs to prevent NoSQL injection
app.use(cookieParser()); // Cookie parsing middleware
app.use(compression()); // Response compression middleware
app.use(fileUpload({ useTempFiles: true })); // File upload middleware
app.use(cors({ origin: 'http://localhost:3000' })); // CORS middleware

// Handle GET requests to the root path
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.use("/api/v1", routes);

// Handle POST requests to the root path
app.post("/", (req, res) => {
    // Handle the POST request logic here
    res.send("POST request received!");
    // You can also send an error response if needed
    // res.status(409).json({ message: "There is a conflict" });
});

// Server startup
let server = app.listen(PORT, () => {
    console.log("Server is listening at " + PORT);
    console.log("Process ID: " + process.pid);
});

// Exit handlers
const exitHandler = () => {
    if (server) {
        console.log("********* Server Close *********");
        process.exit(1);
    } else {
        process.exit(1);
    }
};

// Unhandled error handler
const unExpectedErrorHandler = (err) => {
    console.error(err);
    exitHandler();
};

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);

// Error handling middleware
app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

// Sample route for testing errors
app.post("/err", (req, res) => {
    throw createHttpError.BadRequest("This route has an error");
});

// Default route for handling undefined routes
app.use(async(req, res, next) => {
    next(createHttpError.NotFound("This Route Doesn't Exist"));
});

// Define your API routes