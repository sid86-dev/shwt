import Head from 'next/head';
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import { Context } from '../context/Store'
import React, { useContext, useEffect} from 'react';
import { getCookie, removeCookies } from 'cookies-next';
import Script from 'next/script'

export default function Home() {

    const [state, setState] = useContext(Context);

    const getUserData = async () => {

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
        const access = await getCookie('accessToken');
        const refresh = await getCookie('refreshToken');

        // send conditional request
        if (!refresh) {
            removeCookies('accessToken');
            return { authorization: false, expired: true, payload: null }

        }

        else if (access) {
            const data = await sendReq(access, url + '/api/user');

            if (data.expired == true && data.authorization == true) {
                const data = await sendReq(refresh, url + '/api/user/auth');
                return data;

            }
            return data;

        }

        else {
            const data = await sendReq(refresh, url + '/api/user/auth');
            return data;

        };

        return data;
    };

    useEffect(() => {

        const setAuthData = async () => {

            const authData = await getUserData();
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
          <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
              crossOrigin="anonymous"></Script>
      <Navbar />
      <Main />
    </div>
  )
}
