import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    const { userId, urlId } = req.body;

    const filter = { _id: userId };

    const user = await userSchema.findOne(filter);

    if (!user) {
        return res.send({ success: false })
    }

    try {

        if (user.links.includes(urlId)) {
            return res.send({ success: true, response: "Url already saved" })
        }

        user.links.push(urlId);
        await user.save();

        return res.send({ success: true })
    }
    catch (e) {
        console.log(e)
        return res.send({ success: false })
    }

    return res.send({ success: false })


}