import MongoClient from '../../../utils/mongodb'

async function handler(req, res) {

    const shortId = req.query.shortId

    try {
        await MongoClient.connect();
    } catch (e) {
        console.error(e);
    }

    const shortUrl = await MongoClient.db('shwt').collection('links').findOne({ _id: shortId })


    if (shortUrl == null) return res.json({
        'status': 'url does not exist'
    })

    await MongoClient.db('shwt').collection('links').updateOne({ _id: shortId }, { $set: { clicks: shortUrl.clicks+1 } });

    res.status(200).json({
        'fullUrl': shortUrl.fullUrl,
        'shortId': shortId
    })
}

export default handler;