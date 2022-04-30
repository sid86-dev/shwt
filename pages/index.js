import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Main from '../components/Main';


export default function Home() {


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
