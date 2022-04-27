import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Main from '../components/Main'


export default function Home() {
  return (
    <div >
      <Head>
        <title>Shwt</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="Free URL shortener to create perfect URLs for your business. Shwt is a URL shortening service and a link management platform." />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      <Navbar />
      <Main />
    </div>
  )
}
