import { verifyJWT } from '../../../utils/jwt';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    const unAuthorized = { payload: null, expired: true, authorization: false }
    const Authorized = { payload: null, expired: true, authorization: true }

    const authHeader = await req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(" ")[1];

        const { payload, expired } = verifyJWT(token);

        // for valid access token
        if (payload) {
            return res.json({ payload: payload, expired: false, authorization: true })
        }

        else if (expired) {
            return res.json(Authorized)
        }

        return res.json(unAuthorized)

    }
   
    else {
        return res.json(unAuthorized)
    }

}