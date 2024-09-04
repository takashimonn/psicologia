import { Router } from 'express';
import { GetDiagnosticos } from '../controllers/diagnosticos.controller'


const router = Router();

router.get('/diagnosticos', GetDiagnosticos);


export default router 