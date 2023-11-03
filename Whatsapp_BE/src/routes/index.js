import express from "express";
import authRoutes from "./auth.route.js";

const router = express.Router();

router.use('/auth', authRoutes);
//authRoutes: authRoutes is likely another instance of an Express Router that 
//contains routes related to authentication. It's a way to modularize your routes, 
//and by using router.use('/auth', authRoutes), you are essentially saying, "for any URL that starts with '/auth',
// use the routes defined in authRoutes."

export default router;