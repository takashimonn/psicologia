import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan'; 
// import PsicologosRouter from './routes/psicologos.router';
import PsicologosRouter from './routes/psicologos.router.js';
import pacientesRouter from './routes/pacientes.router.js';
import CitasRouter from './routes/citas.router.js';
import DiagnosticosRouter from './routes/diagnosticos.router.js';
import NotasRouter from './routes/notas.router.js';

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());


import loginRouter from './routes/login.router.js'; 
app.use(loginRouter);

app.use(loginRouter);
app.use(PsicologosRouter);
app.use(CitasRouter);
app.use( pacientesRouter);
app.use(DiagnosticosRouter);
app.use(NotasRouter);

export default app; 