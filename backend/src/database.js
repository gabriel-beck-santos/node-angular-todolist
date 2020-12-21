import 'dotenv/config';
import mongoose from 'mongoose';

import User from './models/user';
import Task from './models/task';
import Project from './models/project';

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  } );
};

const models = { User, Task, Project };

export { connectDb };

export default models;