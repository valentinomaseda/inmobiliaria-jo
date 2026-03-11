import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validar que se enviaron los campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Buscar administrador por email
    const [admins] = await pool.query(
      'SELECT * FROM administrador WHERE email = ?',
      [email]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const admin = admins[0];

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: admin.idAdministrador,
        email: admin.email,
        nombre: admin.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Enviar respuesta
    res.json({
      success: true,
      message: 'Login exitoso',
      data: {
        token,
        admin: {
          id: admin.idAdministrador,
          nombre: admin.nombre,
          email: admin.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña son requeridos'
      });
    }

    // Verificar si el email ya existe
    const [existing] = await pool.query(
      'SELECT idAdministrador FROM administrador WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo administrador
    const [result] = await pool.query(
      'INSERT INTO administrador (nombre, email, password) VALUES (?, ?, ?)',
      [nombre || null, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Administrador registrado exitosamente',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const [admins] = await pool.query(
      'SELECT idAdministrador, nombre, email, created_at FROM administrador WHERE idAdministrador = ?',
      [req.user.id]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Administrador no encontrado'
      });
    }

    res.json({
      success: true,
      data: admins[0]
    });
  } catch (error) {
    next(error);
  }
};
