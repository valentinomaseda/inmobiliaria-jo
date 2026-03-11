import express from 'express';
import { body } from 'express-validator';
import {
  getAll,
  getById,
  create,
  update,
  remove,
  addToPropiedad,
  removeFromPropiedad
} from '../controllers/caracteristica.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validator.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAll);
router.get('/:id', getById);

// Rutas protegidas (requieren autenticación)
router.post('/',
  authMiddleware,
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    validateRequest
  ],
  create
);

router.put('/:id',
  authMiddleware,
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    validateRequest
  ],
  update
);

router.delete('/:id', authMiddleware, remove);

// Vincular/desvincular características a propiedades
router.post('/vincular', authMiddleware, addToPropiedad);
router.delete('/desvincular/:idPropiedad/:idCaracteristica', authMiddleware, removeFromPropiedad);

export default router;
