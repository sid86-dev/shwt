import jwt from 'jsonwebtoken';
import dbConnect from '../../../utils/dbConnect';
import { signJWT } from '../../../utils/jwt';
import userSchema from '../../../utils/models/userSchema'
import buildId from 'build-id'
import { setCookies } from 'cookies-next';

dbConnect();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    const unAuthorized = { payload: null, expired: true, authorization: false }
    const authHeader = req.headers.authorization;

    if (authHeader) {


        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.json(unAuthorized)
        }

        const publicKey = Buffer.from(process.env.NEXT_PUBLIC_APP_PUBLIC_KEY, 'base64').toString('ascii');


        try {
        // for valid refresh token

            const decoded = jwt.verify(token, publicKey);
            const userData = await userSchema.findOne({ _id: decoded.userId })

            if (userData.refreshId === decoded.refreshId) {

                const accessId = buildId(50);
                // create tokens
                const payload = { id: userData._id, email: userData.email, accessId: accessId, lastRefreshId: decoded.refreshId }

                const accessToken = await signJWT(payload, '300s');

                // set latest Ids in db
                userData.accessId = accessId;
                await userData.save()

                // set access token in storage
                setCookies('accessToken', accessToken, { req, res, maxAge: 60 * 5 });

                return res.json({ payload: payload, expired: false, authorization: true })
            }
            else {
                return res.json(unAuthorized)
            }

        }
        catch (e) {
            return res.json(unAuthorized)
        }


            return res.json(unAuthorized)

    }

    else {
        return res.json(unAuthorized)
    }




}