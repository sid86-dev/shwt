import dbConnect from '../../../../utils/dbConnect';
import { signJWT, verifyJWT } from '../../../../utils/jwt';
import userSchema from '../../../../utils/models/userSchema'
import { setCookies} from 'cookies-next';
import buildId from 'build-id'

dbConnect();


export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // login handler
    const { email, password } = req.body;
    const userData = await userSchema.findOne({
        email: email
    });


    if (!userData || userData.password !== password) {
        return res.status(423).send({ success: true, authorization: true, response: "Email or password is invalid" })
    };


    const refreshId = buildId(70);
    const accessId = buildId(50);

    // create tokens
    const payload = { userId: userData._id, links: userData.links, email: userData.email, accessId: accessId, lastRefreshId: refreshId }

    const accessToken = signJWT(payload, '300s');
    const refreshToken = signJWT({ userId: userData._id, links: userData.links, refreshId: refreshId }, '86400s');

    // set latest Ids in db
    userData.accessId = accessId;
    userData.refreshId = refreshId;
    await userData.save()

    // set access token in storage
    setCookies('accessToken', accessToken, { req, res, maxAge: 60 * 5 });
    setCookies('refreshToken', refreshToken, { req, res, maxAge: 60 * 60 * 24 });

    // send user back
    return res.status(200).json({ success: true, authorization: true });

}