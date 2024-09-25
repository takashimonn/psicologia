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

// app.use(cors());
app.use(
    cors({
        origin: "https://psicologia.vercel.app",
        credentials: true,
    })
);

app.get('/', (req, res) => {
    res.send('API en funcionamiento'); // O cualquier mensaje que desees
});

app.use(morgan());
app.use(express.json());


import loginRouter from './routes/login.router.js'; 
app.use(loginRouter);

app.use('/login', loginRouter);
app.use('/psicologos', PsicologosRouter);
app.use('/citas', CitasRouter);
app.use('/pacientes', pacientesRouter);
app.use('/diagnosticos', DiagnosticosRouter);
app.use('/notas', NotasRouter);
// import app from './app';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});



export default app; 