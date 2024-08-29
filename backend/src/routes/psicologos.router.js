import { Router } from 'express';
import {CreatePsicologo, DeletePsicologo, GetPsicologo, GetPsicologos, PutPsicologo } from '../controllers/psicologos.controller';

const router = Router();

router.get('/psicologos', GetPsicologos);

router.get('/psicologos/:id_psicologo', GetPsicologo);
router.post('/psicologos', CreatePsicologo);
router.delete('/psicologos/:id_psicologo', DeletePsicologo);
router.put('/psicologos/:id_psicologo', PutPsicologo);

export default router