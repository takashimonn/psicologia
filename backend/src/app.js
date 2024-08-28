import express from 'express'; 
import PsicologosRouter from './routes/psicologos.router';
import CitasRouter from './routes/citas.router';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.use(PsicologosRouter);
app.use(CitasRouter);

export default app; 