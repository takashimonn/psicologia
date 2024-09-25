import express from 'express'; 
import cors from 'cors';
import morgan from 'morgan'; 
import PsicologosRouter from './routes/psicologos.router';
import pacientesRouter from './routes/pacientes.router';
import CitasRouter from './routes/citas.router';
import DiagnosticosRouter from './routes/diagnosticos.router';
import NotasRouter from './routes/notas.router';

const app = express();

// app.use(cors());
app.use(
    cors({
        origin: "https://psicologia.vercel.app",
        credentials: true,
    })
);

app.use(morgan());
app.use(express.json());


import loginRouter from './routes/login.router'; 
app.use(loginRouter);

app.use(PsicologosRouter);
app.use(CitasRouter);
app.use(pacientesRouter);
app.use(DiagnosticosRouter);
app.use(NotasRouter);

// import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('API en funcionamiento'); // O cualquier mensaje que desees
});

export default app; 