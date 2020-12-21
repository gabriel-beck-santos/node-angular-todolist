
import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        set: val => crypto.createHash('md5').update(val).digest('hex'),
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
);

export default model('user', userSchema);