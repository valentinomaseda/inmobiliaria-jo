import pool from '../config/database.js';

export const getAll = async (req, res, next) => {
  try {
    const { operacion, tipo, estado, destacada } = req.query;
    
    let query = 'SELECT * FROM propiedad WHERE 1=1';
    const params = [];

    if (operacion) {
      query += ' AND operacion = ?';
      params.push(operacion);
    }

    if (tipo) {
      query += ' AND tipo = ?';
      params.push(tipo);
    }

    if (estado) {
      query += ' AND estado = ?';
      params.push(estado);
    } else {
      // Por defecto, solo mostrar disponibles en el frontend
      query += ' AND estado = ?';
      params.push('disponible');
    }

    if (destacada !== undefined) {
      query += ' AND destacada = ?';
      params.push(destacada === 'true' ? 1 : 0);
    }

    query += ' ORDER BY created_at DESC';

    const [propiedades] = await pool.query(query, params);

    // Obtener imágenes de cada propiedad
    for (let propiedad of propiedades) {
      const [imagenes] = await pool.query(
        'SELECT * FROM imagen WHERE idPropiedad = ? ORDER BY orden, idImagen',
        [propiedad.idPropiedad]
      );
      propiedad.imagenes = imagenes;
    }

    res.json({
      success: true,
      data: propiedades
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [propiedades] = await pool.query(
      'SELECT * FROM propiedad WHERE idPropiedad = ?',
      [id]
    );

    if (propiedades.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    const propiedad = propiedades[0];

    // Obtener imágenes
    const [imagenes] = await pool.query(
      'SELECT * FROM imagen WHERE idPropiedad = ? ORDER BY orden, idImagen',
      [id]
    );
    propiedad.imagenes = imagenes;

    // Obtener características
    const [caracteristicas] = await pool.query(
      `SELECT c.* FROM caracteristica c
       INNER JOIN propiedad_caracteristica pc ON c.idCaracteristica = pc.idCaracteristica
       WHERE pc.idPropiedad = ?`,
      [id]
    );
    propiedad.caracteristicas = caracteristicas;

    res.json({
      success: true,
      data: propiedad
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const {
      nombre, valor, descripcion, cantAmbientes, metCuad,
      operacion, tipo, direccion, numero, piso, depto,
      barrio, ciudad, provincia, codigo_postal,
      latitud, longitud, estado, destacada
    } = req.body;

    // Insertar propiedad
    const [result] = await connection.query(
      `INSERT INTO propiedad 
       (nombre, valor, descripcion, cantAmbientes, metCuad, operacion, tipo,
        direccion, numero, piso, depto, barrio, ciudad, provincia, codigo_postal,
        latitud, longitud, estado, destacada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, valor, descripcion, cantAmbientes, metCuad, operacion, tipo,
       direccion, numero, piso, depto, barrio, ciudad, provincia, codigo_postal,
       latitud, longitud, estado || 'disponible', destacada || 0]
    );

    const propiedadId = result.insertId;

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Propiedad creada exitosamente',
      data: { id: propiedadId }
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      nombre, valor, descripcion, cantAmbientes, metCuad,
      operacion, tipo, direccion, numero, piso, depto,
      barrio, ciudad, provincia, codigo_postal,
      latitud, longitud, estado, destacada
    } = req.body;

    const [result] = await pool.query(
      `UPDATE propiedad SET
       nombre = ?, valor = ?, descripcion = ?, cantAmbientes = ?, metCuad = ?,
       operacion = ?, tipo = ?, direccion = ?, numero = ?, piso = ?, depto = ?,
       barrio = ?, ciudad = ?, provincia = ?, codigo_postal = ?,
       latitud = ?, longitud = ?, estado = ?, destacada = ?
       WHERE idPropiedad = ?`,
      [nombre, valor, descripcion, cantAmbientes, metCuad, operacion, tipo,
       direccion, numero, piso, depto, barrio, ciudad, provincia, codigo_postal,
       latitud, longitud, estado, destacada, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Propiedad actualizada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM propiedad WHERE idPropiedad = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Propiedad eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};
