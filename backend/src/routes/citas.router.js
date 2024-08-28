import { Router } from 'express';
import { GetCitas, GetCita, CreateCita, DeleteCita, PutCita } from '../controllers/citas.controller';

const router = Router();

router.get('/citas', GetCitas);
router.get('/citas/:id_cita', GetCita);
router.post('/citas', CreateCita);
router.delete('/citas/:id_cita', DeleteCita);
router.put('/citas/:id_cita', PutCita);

export default router