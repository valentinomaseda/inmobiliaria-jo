import express from 'express';
import { body } from 'express-validator';
import { login, register, getProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validateRequest } from '../middlewares/validator.js';

const router = express.Router();

// Login
router.post('/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validateRequest
  ],
  login
);

// Registro (protegido - solo admins pueden crear otros admins)
router.post('/register',
  authMiddleware,
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateRequest
  ],
  register
);

// Obtener perfil
router.get('/profile', authMiddleware, getProfile);

export default router;
