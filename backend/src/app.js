import express from 'express'; 
import PsicologosRouter from './routes/psicologos.router';
import pacientesRouter from './routes/pacientes.router';

const app = express();

app.use (express.json()); 
app.use (PsicologosRouter);
app.use (pacientesRouter);


export default app; 