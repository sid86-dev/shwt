import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Context } from '../context/Store'
import { useContext, useEffect, useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { getCookie, removeCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import Profile from '../components/user/Profile';

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
    const router = useRouter();
    const { query } = useRouter();

    const [state, setState] = useContext(Context);

    useEffect(() => {
        const tab = query.tab;

        if (authData.authorization == false && tab == undefined) {
            router.push('/account?tab=login')
        }

        const setAuthData = async () => {
            await setState(prevState => ({
                ...prevState,
                ['user']: authData,
                ['nav']: router.pathname,
                ['authorized']: true,
                ['tab']: 'login'
            }));
        };

        setAuthData().catch(console.error);

    }, []);


    return (
        <div className="vh-100" >
            <Head>
                <title>Shwt | Me</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar />

            {authData.authorization ? <Profile /> : state.tab == 'login' ? < Login /> : <Signup />}
            
        </div>
    )
}
