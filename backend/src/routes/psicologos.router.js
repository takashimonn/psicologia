// import { Router } from 'express';
// import {CreatePsicologo, DeletePsicologo, GetPsicologo, GetPsicologos, PutPsicologo } from '../controllers/psicologos.controller';

// const router = Router();

// router.get('/psicologos', GetPsicologos);

// router.get('/psicologos/:id_psicologo', GetPsicologo);
// router.post('/psicologos', CreatePsicologo);
// router.delete('/psicologos/:id_psicologo', DeletePsicologo);
// router.put('/psicologos/:id_psicologo', PutPsicologo);


// export default router

import { Router } from 'express';
import {
  CreatePsicologo,
  DeletePsicologo,
  GetPsicologo,
  GetPsicologos,
  PutPsicologo
} from '../controllers/psicologos.controller.js';  // Asegúrate de que la ruta y la extensión sean correctas

const router = Router();

// Rutas de Psicólogos
router.get('/', GetPsicologos);  // Cambié la ruta para evitar duplicación, ya que el prefijo '/psicologos' viene del index.js
router.get('/:id_psicologo', GetPsicologo);
router.post('/', CreatePsicologo);
router.delete('/:id_psicologo', DeletePsicologo);
router.put('/:id_psicologo', PutPsicologo);

export default router;
