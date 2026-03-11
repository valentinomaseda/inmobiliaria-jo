import pool from '../config/database.js';

export const getAll = async (req, res, next) => {
  try {
    const [caracteristicas] = await pool.query('SELECT * FROM caracteristica ORDER BY nombre');

    res.json({
      success: true,
      data: caracteristicas
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [caracteristicas] = await pool.query(
      'SELECT * FROM caracteristica WHERE idCaracteristica = ?',
      [id]
    );

    if (caracteristicas.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Característica no encontrada'
      });
    }

    res.json({
      success: true,
      data: caracteristicas[0]
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    const [result] = await pool.query(
      'INSERT INTO caracteristica (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion]
    );

    res.status(201).json({
      success: true,
      message: 'Característica creada exitosamente',
      data: { id: result.insertId }
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const [result] = await pool.query(
      'UPDATE caracteristica SET nombre = ?, descripcion = ? WHERE idCaracteristica = ?',
      [nombre, descripcion, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Característica no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Característica actualizada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM caracteristica WHERE idCaracteristica = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Característica no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Característica eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Vincular característica a propiedad
export const addToPropiedad = async (req, res, next) => {
  try {
    const { idPropiedad, idCaracteristica } = req.body;

    await pool.query(
      'INSERT INTO propiedad_caracteristica (idPropiedad, idCaracteristica) VALUES (?, ?)',
      [idPropiedad, idCaracteristica]
    );

    res.status(201).json({
      success: true,
      message: 'Característica vinculada a la propiedad'
    });
  } catch (error) {
    next(error);
  }
};

// Desvincular característica de propiedad
export const removeFromPropiedad = async (req, res, next) => {
  try {
    const { idPropiedad, idCaracteristica } = req.params;

    const [result] = await pool.query(
      'DELETE FROM propiedad_caracteristica WHERE idPropiedad = ? AND idCaracteristica = ?',
      [idPropiedad, idCaracteristica]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Relación no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Característica desvinculada de la propiedad'
    });
  } catch (error) {
    next(error);
  }
};
