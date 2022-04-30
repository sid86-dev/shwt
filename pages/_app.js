import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/globals.css'
import Popper from '@popperjs/core';
import { Router } from "next/router";
import NProgress from 'nprogress'
import Store from '../context/Store';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
    NProgress.configure({ showSpinner: false });
    Router.events.on('routeChangeStart', (url) => {
        NProgress.start()
    });
    Router.events.on('routeChangeComplete', (url) => {
        NProgress.done()
    });
    return (
        <Store>
            <Component {...pageProps} />
        </Store>
    )
}

export default MyApp