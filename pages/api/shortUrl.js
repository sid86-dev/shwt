import dbConnect from '../../utils/dbConnect';
import urlSchema from '../../utils/models/urlSchema'
import buildId from 'build-id';

dbConnect();


async function handler(req, res) {    

    if (req.method !== 'POST') {
        res.status(500).json({ message: 'Soory this is post route' })
    }

    const { fullUrl } = req.body

    const isAvailable = await urlSchema.findOne({ 'fullUrl': fullUrl })

    if (isAvailable != null) return res.json(isAvailable)

    const data = await {
        _id: buildId(7),
        fullUrl: fullUrl
    };

    const shortUrl = await urlSchema.create(data);

    res.status(200).json(shortUrl)
   
}

export default handler;