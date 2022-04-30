import jwt from 'jsonwebtoken';

const publicKey = Buffer.from(process.env.NEXT_PUBLIC_APP_PUBLIC_KEY, 'base64').toString('ascii');

const privateKey = Buffer.from(process.env.NEXT_PUBLIC_APP_PRIVATE_KEY, 'base64').toString('ascii');

// sign jwt
export function signJWT(payload, expiresIn) {
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
}

// verify jwt
export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false, authorization: false };
    }
    catch (e) {
        return { payload: null, expired: 'jwt expired or invalid', authorization: false };
    }
}