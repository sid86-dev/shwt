import MongoClient from '../../utils/mongodb'
import buildId from 'build-id';


async function handler(req, res) {    

    if (req.method !== 'POST') {
        res.status(500).json({ message: 'Soory this is post route' })
    }

    try {
        await MongoClient.connect();
    } catch (e) {
        console.error(e);
    }

    const { fullUrl } = req.body
    const client = await MongoClient.db('shwt').collection('links')
    const isAvailable = await client.findOne({ 'fullUrl': fullUrl })
    
    if(isAvailable != null) return res.json({
        'fullUrl': isAvailable.fullUrl,
        'shortId': isAvailable._id
    })

    const shortId = await buildId(7)
    const data = {
        _id: shortId,
        fullUrl: fullUrl,
        clicks: 0,
        created: new Date()
    };

    await client.insertOne(data);

    res.status(200).json({
        'fullUrl': fullUrl,
        'shortId': shortId
    })
   
}

export default handler;