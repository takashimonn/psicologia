import { Router } from 'express';
import { GetCitas, GetCita } from '../controllers/citas.controller';

const router = Router();

router.get('/citas', GetCitas);
router.get('/citas/:id_cita', GetCita);
router.post('/citas');
router.delete('/citas:id_cita');
router.put('citas:id_cita');

export default router