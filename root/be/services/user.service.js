import createHttpError from "http-errors";
import userModel from "../models/index.js";
export const findUser = async(userId) => {
    const user = await userModel.findById(userId);
    if (!user) throw createHttpError.BadRequest("Please fill all the details");
}