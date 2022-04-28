RedirectUrl.getInitialProps = async (ctx) => {
    const { query, res } = ctx;

    const shortId = await query.shortId;

    const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getUrl/${shortId}`

    console.log(url)

    const response = await fetch(url);
    const data = await response.json();



    if (res) {
        res.writeHead(302, { // or 301
            Location: data.fullUrl || `/invalid?timeStamp=${new Date().getTime()}`,
        });
        res.end();
    }

    return { shortId: shortId }
}

export default function RedirectUrl({ shortId }) {

    return (<div>
        <h1>{shortId}</h1>
    </div>)
}


