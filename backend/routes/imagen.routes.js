import express from 'express';
import {
  uploadImages,
  getByPropiedad,
  setPrincipal,
  updateOrden,
  remove
} from '../controllers/imagen.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

// Rutas públicas
router.get('/propiedad/:idPropiedad', getByPropiedad);

// Rutas protegidas (requieren autenticación)
router.post('/upload', authMiddleware, upload.array('images', 10), uploadImages);
router.put('/:idImagen/principal', authMiddleware, setPrincipal);
router.put('/:idImagen/orden', authMiddleware, updateOrden);
router.delete('/:idImagen', authMiddleware, remove);

export default router;
