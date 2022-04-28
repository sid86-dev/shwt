import dbConnect from '../../../utils/dbConnect';
import urlSchema from '../../../utils/models/urlSchema'

dbConnect();

async function handler(req, res) {

    const { shortId } = req.query

    const shortUrl = await urlSchema.findById(shortId);

//  response if url is invalid
    if (shortUrl == null) return res.json({
        'status': 'url does not exist'
    })

 // increment the clicks   
    shortUrl.clicks++
    await shortUrl.save()

    res.status(200).json(shortUrl)
}

export default handler;