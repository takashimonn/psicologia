import express from 'express'; 
import PsicologosRouter from './routes/psicologos.router';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.use(PsicologosRouter);

export default app; 