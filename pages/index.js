import Head from 'next/head';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { Context } from '../context/Store'
import React, { useContext, useEffect, useState } from 'react';
import { getCookie, removeCookies } from 'cookies-next';

export async function getServerSideProps({ req, res }) {

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
        return {
            props: {
                authData: { authorization: false, expired: true, payload: null },
            },
        };
    }

    else if (access) {
        const data = await sendReq(access, url + '/api/user');

        if (data.expired == true && data.authorization == true) {
            const data = await sendReq(refresh, url + '/api/user/auth');
            return {
                props: {
                    authData: data,
                },
            };
        }
        return {
            props: {
                authData: data,
            },
        };
    }

    else {
        const data = await sendReq(refresh, url + '/api/user/auth');
        return {
            props: {
                authData: data,
            },
        };
    };

    return {
        props: {
            authData: data,
        },
    };

};

export default function Home({ authData }) {
    const [state, setState] = useContext(Context);

    useEffect(() => {
        const setAuthData = async () => {
            await setState(prevState => ({
                ...prevState,
                ['user']: authData,
                ['authorized']: true,
            }));
        };

        setAuthData().catch(console.error);
    }, [])

  return (
    <div >
      <Head>
        <title>Shwt</title>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <Main />
    </div>
  )
}
