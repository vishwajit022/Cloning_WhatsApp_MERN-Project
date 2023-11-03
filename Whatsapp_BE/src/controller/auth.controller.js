import express from "express";

const app = express();

app.use(express.json()); // This middleware is necessary to parse JSON data from the request body


export const register = async(req, res, next) => {
    try {
        res.send(req.body);

    } catch (error) {

        //res.status(500).json({ message: error.message });
        //Similar to above line of code
        // If an error occurs, pass it to the error-handling middleware
        next(error);
    }
};
export const login = async(req, res, next) => {
    try {

    } catch (error) {

        //res.status(500).json({ message: error.message });
        //Similar to above line of code
        // If an error occurs, pass it to the error-handling middleware
        next(error);
    }
};
export const logout = async(req, res, next) => {
    try {

    } catch (error) {

        //res.status(500).json({ message: error.message });
        //Similar to above line of code
        // If an error occurs, pass it to the error-handling middleware
        next(error);
    }
};
export const refreshToken = async(req, res, next) => {
    try {

    } catch (error) {

        //res.status(500).json({ message: error.message });
        //Similar to above line of code
        // If an error occurs, pass it to the error-handling middleware
        next(error);
    }
};