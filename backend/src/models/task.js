import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        projectId: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        checkedDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
);

export default model('task', taskSchema);