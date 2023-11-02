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




dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

app.use(cookieParser());

app.use(compression());

app.use(fileUpload({
    useTempFiles: true,
}));

app.use(cors({
    origin: 'http://localhost:300',
}))

// Handle GET requests to the root path
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

// Handle POST requests to the root path
app.post("/", (req, res) => {
    // Handle the POST request logic here
    res.send("POST request received!");

    // res.status(409).json({ message: "There is a conflict" });

});

let server = app.listen(PORT, () => {
    console.log("Server is listening at " + PORT);
    console.log("process:" + process.pid);
    // throw new error("Error is in app.listen");
});
const exitHandler = () => {
    if (server) {
        console.log("********* Server Close *********");
        process.exit(1);
    } else {
        process.exit(1);
    }
}
const unExpectedErrorHandler = (err) => {
    console.log(err);
    exitHandler();
}
process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandleRejection", unExpectedErrorHandler);

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
});
app.post("/err", (req, res) => {
    throw createHttpError.BadRequest("this route has an error");
});
app.use(async(req, res, next) => {
    next(createHttpError.NotFound("This Route Doesn't Exist"));
})