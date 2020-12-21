import 'dotenv/config';
import { model } from 'mongoose';
import * as jwt from '../security/jwt'
const User = model('user');

export async function createUser(request, response) {
    try {
        const user = await User.create(request.body);
        const token = jwt.sign({user: user.id});

        return response.json({user, token});
    } catch (error) {
        response.status(400).send(error);
    }
}

