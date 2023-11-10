import express from "express";
import createHttpError from "http-errors";
import { createUser } from "../services/auth.service.js";

const app = express();
app.use(express.json());

// Register a new user
export const register = async(req, res, next) => {
    try {
        // Extract user data from the request body
        const { name, email, picture, status, password } = req.body;

        // Validate that all required fields are present
        if (!name || !email || !picture || !status || !password) {
            throw createHttpError.BadRequest("Please fill all fields.");
        }

        // Create the user
        const newUser = await createUser({
            name,
            email,
            picture,
            status,
            password,
        });

        // Send a success response with the created user information
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// User login
export const login = async(req, res, next) => {
    try {
        // Your login logic goes here

        // Send a success response if needed
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// User logout
export const logout = async(req, res, next) => {
    try {
        // Your logout logic goes here

        // Send a success response if needed
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

// Refresh user token
export const refreshToken = async(req, res, next) => {
    try {
        // Your token refresh logic goes here

        // Send a success response if needed
        res.status(200).json({ message: "Token refreshed successfully" });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};

export default app;