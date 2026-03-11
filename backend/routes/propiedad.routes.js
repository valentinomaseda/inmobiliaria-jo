import express from 'express';
import { body } from 'express-validator';
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../controllers/propiedad.controller.js';
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
    body('valor').isNumeric().withMessage('El valor debe ser numérico'),
    body('operacion').isIn(['venta', 'alquiler', 'alquiler_temporal']).withMessage('Operación inválida'),
    body('tipo').isIn(['casa', 'departamento', 'terreno', 'local', 'oficina', 'galpon', 'quinta']).withMessage('Tipo inválido'),
    validateRequest
  ],
  create
);

router.put('/:id',
  authMiddleware,
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('valor').isNumeric().withMessage('El valor debe ser numérico'),
    body('operacion').isIn(['venta', 'alquiler', 'alquiler_temporal']).withMessage('Operación inválida'),
    body('tipo').isIn(['casa', 'departamento', 'terreno', 'local', 'oficina', 'galpon', 'quinta']).withMessage('Tipo inválido'),
    validateRequest
  ],
  update
);

router.delete('/:id', authMiddleware, remove);

export default router;
