import express from 'express'; 
import PsicologosRouter from './routes/psicologos.router';

const app = express();

app.use (PsicologosRouter);

export default app; 