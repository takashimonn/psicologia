import { Router } from 'express';
import { GetDiagnosticos, GetDiagnostico, CreateDiagnostico, DeleteDiagnostico, PutDiagnostico, GetDiagnosticosByPsicologo, GetDiagnosticosByPaciente } from '../controllers/diagnosticos.controller'

const router = Router();

router.get('/diagnosticos', GetDiagnosticos);
router.get('/diagnosticos/:id_diagnostico', GetDiagnostico);
router.post('/diagnosticos', CreateDiagnostico);
router.delete('/diagnosticos/:id_diagnostico', DeleteDiagnostico)
router.put('/diagnosticos/:id_diagnostico', PutDiagnostico);
router.get('/diagnosticos/psicologo/:id_psicologo', GetDiagnosticosByPsicologo);

router.get('/diagnosticos/pacientes/:id_paciente', GetDiagnosticosByPaciente);

export default router 