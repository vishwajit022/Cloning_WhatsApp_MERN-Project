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