import express from "express";
import createHttpError from "http-errors";
import { createUser } from "../services/auth.service.js";
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from "../services/token.service.js";
import { sign } from "../services/token.util.js";
import { signUser } from "../services/auth.service.js";

const app = express();
app.use(express.json());

// Register a new user

export const register = async(req, res, next) => {
    try {
        // Extract user data from the request body
        const { name, email, picture, status, password } = req.body;

        // Validate that all required fields are present
        if (!name || !email || !password) {
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
        const access_token = await generateToken({ userId: newUser._id }, "1d", process.env.ACCESS_TOKEN_SECRET);
        const refresh_token = await generateToken({ userId: newUser._id }, "30d", process.env.REFRESH_TOKEN_SECRET);

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            path: "api/v1/auth/refreshtoken",
            maxAge: 30 * 24 * 60 * 60 * 1000, //30 days

        });
        console.table({ access_token, refresh_token });
        res.json({
            message: 'register success.',
            access_token,
            user: {
                name: user.name,
                _id: user._id,
                email: user.email,
                picture: user.picture,
                status: user.status,

            }
        });


        res.json(newUser);
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
        const { email, password } = req.body;
        const user = signUser(email, password);

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
        res.clearCookie('refreshtoken', {
            path: "api/v1/auth/refreshtoken",
        });
        res.json({
            message: "You have been logged out!",
        });

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
        const refresh_token = req.cookies.refreshtoken;
        if (!refresh_token) throw createHttpError.Unauthorized("Please login.");

        // Verify the refresh token
        const check = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);

        // Fetch the user details using the userId from the refresh token
        const user = await findUser(check.userId);

        // Generate a new access token
        const access_token = await generateToken({
            userId: user._id // Use user._id after fetching user details
        }, "1d", process.env.ACCESS_TOKEN_SECRET);

        // Send the response with the new access token and user details
        res.json({
            message: 'Refresh token success.',
            access_token,
            user: {
                name: user.name,
                _id: user._id,
                email: user.email,
                picture: user.picture,
                status: user.status,
            }
        });
    } catch (error) {
        // Pass any errors to the error-handling middleware
        next(error);
    }
};


export default app;