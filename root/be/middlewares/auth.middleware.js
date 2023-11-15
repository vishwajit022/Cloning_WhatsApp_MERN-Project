import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import util from 'util'; // Import the 'util' module

export default async function(req, res, next) {
    try {
        // Check if the 'Authorization' header is present
        if (!req.headers['authorization']) {
            throw createHttpError(401, 'Unauthorized');
        }

        const bearerToken = req.headers['authorization'];
        const token = bearerToken.split(' ')[1];

        // Log decoded token information
        const decodedToken = jwt.decode(token, { complete: true });
        console.log(decodedToken);

        const verifyJwt = util.promisify(jwt.verify);

        try {
            const decoded = await verifyJwt(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.error(error);
            return next(createHttpError.Unauthorized());
        }
    } catch (error) {
        // Pass the error to the error-handling middleware
        next(error);
    }
}