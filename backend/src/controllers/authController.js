import 'dotenv/config';
import { model } from 'mongoose';
import * as jwt from '../security/jwt'
const User = model('user');

export async function login(request, response) {
    console.log(request.headers.authorization);
    try {
        const [, hash] = request.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

        const user = await User.findOne({email,password});
        if(!user){
            return response.status(401).send("User Not found!");
        }
        const token = jwt.sign({user: user.id});
        return response.json({user, token});
    } catch (error) {
        response.status(400).send(error);
    }
}

export async function me(request, response) {
   response.send(request.auth);
}
