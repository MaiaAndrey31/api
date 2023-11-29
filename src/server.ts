import 'dotenv/config';
import express, { json } from 'express';
import { routes } from './routes';
import { setupMongo } from './database';


setupMongo().then(() => {

    const app = express();



app.use(json());
app.use(routes);

app.listen(3131, () => console.log('🚀 server online'));

});
