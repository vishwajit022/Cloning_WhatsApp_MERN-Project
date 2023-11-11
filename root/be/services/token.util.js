import jwt from 'jsonwebtoken';

export const sign = async(payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: expiresIn
        }, function(err, token) {
            if (err) {
                // Log the error or handle it as needed
                console.error(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};