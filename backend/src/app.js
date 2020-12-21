import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { connectDb } from './database';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/' + process.env.API_VERSION + '/', require('./routes'));

connectDb().then(async () => {
    app.listen(process.env.PORT, () =>
        console.log('Example app listening on port ${process.env.PORT}!'),
    );
});