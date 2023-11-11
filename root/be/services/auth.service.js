import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/index.js";
import bcrypt from "bcrypt";

// Env Variables
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async(userData) => {
    try {
        const { name, email, picture, status, password } = userData;

        if (!name || !email || !password) {
            throw createHttpError.BadRequest("Please fill all fields.");
        }
        if (!validator.isLength(name, { min: 2 })) {
            throw createHttpError.BadRequest("Please make sure that your name is more than 2 characters");
        }
        if (!validator.isEmail(email)) {
            throw createHttpError.BadRequest("Please enter a valid email address");
        }

        // const checkDb = await UserModel.findOne({ email });

        // if (checkDb) {
        //     throw createHttpError.Conflict("Please try again with a different email address");
        // }

        const user = await new UserModel({
            name,
            email,
            picture: picture || DEFAULT_PICTURE,
            status: status || DEFAULT_STATUS,
            password,
        }).save();

        return user;
    } catch (error) {
        throw error; // Rethrow the error for the calling function to handle
    }
};
export const signUser = async(email, password) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

    //Check if the user exist
    if (!user) {
        throw createHttpError.NotFound('Invalid Email or Password');
    }
    let passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw createHttpError.NotFound("Inavlid credentials");
    return user;
};