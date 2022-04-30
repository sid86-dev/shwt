import { removeCookies } from 'cookies-next';

export default async function handler(req, res) {
    removeCookies('refreshToken', { req, res });
    res.send({ success: true })
}