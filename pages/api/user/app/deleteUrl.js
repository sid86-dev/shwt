import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    const { userId, urlId } = req.body;

    const filter = { _id: userId };

    const user = await userSchema.findOne(filter);

    if (!user) {
        return res.status(423).send({ success: false })
    }

    try {

        if (!user.links.includes(urlId)) {
            return res.status(423).send({ success: false, response: "Url does not exist" })
        }

        var index = user.links.indexOf(urlId);

        user.links.splice(index, 1);
        await user.save();

        return res.status(200).send({ success: true })
    }
    catch (e) {
        console.log(e)
        return res.status(423).send({ success: false })
    }

    return res.status(423).send({ success: false })


}