import { Router } from 'express';
import { verificarCredenciales } from '../controllers/login.controller';

const router = Router();

// Otras rutas
router.post("/login", verificarCredenciales); 

export default router;
