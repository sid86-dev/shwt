import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
          <Head>
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
              <meta name="keywords" content="urlshortner, url, short, links, bitly, tinyurl, shwt, Url, URL" />
              <meta name="description" content="Free URL shortener to create perfect URLs for your business. Shwt is a URL shortening service and a link management platform." />
              <meta name="robots" content="noindex,nofollow" />
              <link rel="icon" href="/favicons/favicon.ico" />
              <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
              <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
              <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
              <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
              <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
              <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
              <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
              <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
              <link rel="icon" type="image/png" href="/favicons/favicon-196x196.png" sizes="196x196" />
              <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
              <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32" />
              <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16" />
              <link rel="icon" type="image/png" href="/favicons/favicon-128.png" sizes="128x128" />
              <meta name="application-name" content="&nbsp;" />
              <meta name="msapplication-TileColor" content="#FFFFFF" />
              <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
              <meta name="msapplication-square70x70logo" content="/favicons/mstile-70x70.png" />
              <meta name="msapplication-square150x150logo" content="/favicons/mstile-150x150.png" />
              <meta name="msapplication-wide310x150logo" content="/favicons/mstile-310x150.png" />
              <meta name="msapplication-square310x310logo" content="/favicons/mstile-310x310.png" />
              {/*nprogress*/}
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                  integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                  crossOrigin="anonymous" referrerPolicy="no-referrer" />
              
          </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}