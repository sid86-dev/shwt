import dbConnect from '../../../utils/dbConnect';
import urlSchema from '../../../utils/models/urlSchema'

dbConnect();

async function handler(req, res) {

    const { app } = req.body;

    const { shortId } = req.query

    const shortUrl = await urlSchema.findById(shortId);

//  response if url is invalid
    if (shortUrl == null) return res.json({
        status: 'url does not exist'
    })

    if (app) {
        return res.status(200).json(shortUrl)
    }

    // increment the clicks 
    shortUrl.clicks++
    await shortUrl.save()

    return res.status(200).json(shortUrl)
}

export default handler;