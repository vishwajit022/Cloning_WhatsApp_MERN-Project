import jwt from 'jsonwebtoken';

export const generateToken = async(payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn }, (err, token) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

export const verifyToken = async(token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                logger.error(error);
                resolve(null);
            } else {
                resolve(payload);
            }
        });
    });
};