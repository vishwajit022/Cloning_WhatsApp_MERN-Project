import createHttpError from "http-errors";



export const createUser = async(userData) => {

    const { name, email, picture, status, password } = userData;

    if (!name || !email || !picture || !status || !password) {
        throw createHttpError.BadRequest("Please fill all fields.");
    }
};