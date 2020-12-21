import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    },
);


export default model('project', projectSchema);