import { Router } from 'express';
import { GetCitas, GetCita, CreateCita, DeleteCita, PutCita, GetCitasPaciente, ConfirmarCita, CancelarCita } from '../controllers/citas.controller.js';

const router = Router();

router.get('/citas', GetCitas);
router.get('/citas/:id_cita', GetCita);
router.post('/citas', CreateCita);
router.delete('/citas/:id_cita', DeleteCita);
router.put('/citas/:id_cita', PutCita);

router.get('/citas/paciente/:id_paciente', GetCitasPaciente);
router.put('/citas/confirmar/:id_cita', ConfirmarCita);

router.put('/citas/:id_cita/cancelar', CancelarCita);

export default router