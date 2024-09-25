import { Router } from "express";
import { GetNotas, GetNota, CreateNota, DeleteNota, PutNota } from "../controllers/notas.controller.js";

const router = Router();

router.get("/notas", GetNotas);
router.get("/notas/:id_nota", GetNota);
router.post('/notas', CreateNota);
router.delete("/notas/:id_nota", DeleteNota);
router.put("/notas/:id_nota", PutNota);

export default router