import express from "express";
import { login, logout, refreshToken, register } from "../controller/auth.controller.js";
import trimRequest from "trim-request";

const router = express.Router();

// Use the `post` method to define the routes, and specify the corresponding controller functions
router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshToken);
router.route("/testingauthMiddleware").get(trimRequest.all, (req, res) => {
    res.send("Hello");
});


export default router;