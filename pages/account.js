import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Context } from '../context/Store'
import { useContext, useEffect } from 'react';
import Login from '../components/Login';
import { getCookie, removeCookies } from 'cookies-next';

Account.getInitialProps = async (ctx) => {

    const { query, res, req } = ctx;

    var url = process.env.NEXT_PUBLIC_DOMAIN_URL;

    async function sendReq(token, url) {

        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        return response.json(); 
    }

    // get token from storage
    const access = await getCookie('accessToken', { req, res });
    const refresh = getCookie('refreshToken', { req, res });

    // send conditional request
    if (!refresh) {
        removeCookies('accessToken', { req, res });
        return { authData: { authorization: false, expired: true, payload: null }};
    }

    else if (access) {
        const data = await sendReq(access, url + '/api/user');

        if (data.expired == true && data.authorization == true) {
            const data = await sendReq(refresh, url + '/api/user/auth');
            return { authData: data};
        }
        return { authData: data };
    }

    else {
        const data = await sendReq(refresh, url + '/api/user/auth');
        return { authData: data};
    };

    if (res) {
        res.writeHead(302, { // or 301
            Location: '/',
        });
        res.end();
    }

    return {authData: data}
};

export default function Account({ authData }) {

    const [state, setState] = useContext(Context);

    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            ['user']: authData
        }));
    },[])

    return (
        <div >
            <Head>
                <title>Shwt | {state.name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar />
            {state.user?.authorization ? <h1>Authorized</h1> : <Login /> }
            
        </div>
    )
}
