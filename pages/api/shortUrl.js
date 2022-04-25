import MongoClient from '../../utils/mongodb'

async function handler(req, res) {

    function makeId(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }
    

    if (req.method !== 'POST') {
        res.status(500).json({ message: 'Soory this is post route' })
    }

    try {
        await MongoClient.connect();
    } catch (e) {
        console.error(e);
    }

    const fullUrl = req.body.fullUrl
    const shortId = await makeId(7)

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