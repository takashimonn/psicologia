import { Router } from 'express';
import {getPaciente, getPacientes, createPaciente, deletePaciente, putPaciente } from '../controllers/pacientes.controller';

const router = Router();

router.get('/pacientes', getPacientes);

router.get('/pacientes', getPaciente);
router.get('/pacientes', createPaciente);
router.get('/pacientes', deletePaciente);
router.get('/pacientes', putPaciente);