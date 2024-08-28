import { Router } from 'express';
import { getPacientes, getPaciente, createPaciente, deletePaciente, putPaciente } from '../controllers/pacientes.controller';

const router = Router();

router.get('/pacientes', getPacientes);
router.get('/pacientes/:id_paciente', getPaciente);
router.post('/pacientes', createPaciente);
router.delete('/pacientes/:id_paciente', deletePaciente);
router.put('/pacientes/:id_paciente', putPaciente);

export default router