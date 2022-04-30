import dbConnect from '../../../utils/dbConnect';
import { signJWT, verifyJWT } from '../../../utils/jwt';
import userSchema from '../../../utils/models/userSchema'
import { setCookies } from 'cookies-next';
import buildId from 'build-id'

dbConnect();

async function handler(req, res) {

    const { email, password } = req.body

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }
    // checks if email already exists 
    const userExist = await userSchema.findOne({ email: email });

    if (userExist == null) {

        const refreshId = buildId(70);
        const accessId = buildId(50);

        // create user in db
        const userData = await userSchema.create({
            _id: buildId(10),
            email: email,
            password: password,
            created: new Date(),
            refreshId: refreshId,
            accessId: accessId
        });


        // create tokens
        const payload = { id: userData._id, email: userData.email, accessId: accessId, lastRefreshId: refreshId }

        const accessToken = signJWT(payload, '300s');
        const refreshToken = signJWT({ userId: userData._id, refreshId: refreshId }, '86400s');


        // set access token in storage
        setCookies('accessToken', accessToken, { req, res, maxAge: 60 * 5 });
        setCookies('refreshToken', refreshToken, { req, res, maxAge: 60 * 60 * 24 });

        // send user back
        return res.status(200).json({ success: true, authorization: true });

    }
    else {
        return res.status(423).json({ success: false, response: 'Email already exist' })
    }


}

export default handler;