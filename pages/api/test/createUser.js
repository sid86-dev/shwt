import dbConnect from '../../../utils/dbConnect';
import userSchema from '../../../utils/models/userSchema'

dbConnect();


async function handler(req, res) {

    const data = await {
        email: 'test2@gmail.com',
        password: 'password123' 
    };

    const user = await userSchema.create(data);

    res.status(200).json(user)

}

export default handler;