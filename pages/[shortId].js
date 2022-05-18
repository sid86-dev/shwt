
export async function getServerSideProps(context) {

    const shortId = context.query.shortId;

    const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/getUrl/${shortId}`

    const response = await fetch(url);
    const data = await response.json();

    return {
        redirect: {
            destination: data.fullUrl || `/invalid?timeStamp=${new Date().getTime()}`,
            permanent: true
        }
    }
}

export default function RedirectUrl({ shortId }) {

    return (<div>
        <h1>{shortId}</h1>
    </div>)
}


