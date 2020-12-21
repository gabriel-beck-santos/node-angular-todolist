import { request, response } from "express";
import user from "../models/user";
import { model } from 'mongoose';
import * as jwt from '../security/jwt'

const User = model('user');

export const authMiddleware = async (request, response, next) => {
    try {
        const [, token] = request.headers.authorization.split(' ');
        const payload = await jwt.validate(token);
        const user = await User.findById(payload.user);

        if (!user) {
            response.status(401);
        }

        request.auth = user;
        console.log(request.auth);
        next();
    } catch (error) {
        response.status(401).send(error);
    }
}

module.exports = authMiddleware;