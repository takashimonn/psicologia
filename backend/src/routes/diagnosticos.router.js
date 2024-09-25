import { Router } from 'express';
import { GetDiagnosticos, GetDiagnostico, CreateDiagnostico, DeleteDiagnostico, PutDiagnostico, GetDiagnosticosByPsicologo } from '../controllers/diagnosticos.controller.js'


const router = Router();

router.get('/diagnosticos', GetDiagnosticos);
router.get('/diagnosticos/:id_diagnostico', GetDiagnostico);
router.post('/diagnosticos', CreateDiagnostico);
router.delete('/diagnosticos/:id_diagnostico', DeleteDiagnostico)
router.put('/diagnosticos/:id_diagnostico', PutDiagnostico);
router.get('/diagnosticos/psicologo/:id_psicologo', GetDiagnosticosByPsicologo);

export default router 