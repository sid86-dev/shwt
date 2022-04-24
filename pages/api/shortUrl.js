import MongoClient from '../../utils/mongodb'
const Parser = require('shortid')

async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(500).json({ message: 'Soory this is post route' })
    }

    try {
        await MongoClient.connect();
    } catch (e) {
        console.error(e);
    }

    const fullUrl = req.body.fullUrl
    const shortId = await Parser.generate()

    const data = {
        _id: shortId,
        fullUrl: fullUrl,
        clicks: 0
    }

    await MongoClient.db('shwt').collection('links').insertOne(data);

    res.status(200).json({
        'fullUrl': fullUrl,
        'shortId': shortId
    })
   
}

export default handler;