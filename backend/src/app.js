import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan'; 
import PsicologosRouter from './routes/psicologos.router';
import pacientesRouter from './routes/pacientes.router';
import CitasRouter from './routes/citas.router';
import DiagnosticosRouter from './routes/diagnosticos.router';
import NotasRouter from './routes/notas.router';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(morgan());
app.use(express.json());

app.use(PsicologosRouter);
app.use(CitasRouter);
app.use(pacientesRouter);
app.use(DiagnosticosRouter);
app.use(NotasRouter);
export default app; 