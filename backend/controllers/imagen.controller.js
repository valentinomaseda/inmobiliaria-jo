import pool from '../config/database.js';
import cloudinary from '../config/cloudinary.js';

export const uploadImages = async (req, res, next) => {
  try {
    const { idPropiedad } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se subieron imágenes'
      });
    }

    // Verificar que la propiedad existe
    const [propiedades] = await pool.query(
      'SELECT idPropiedad FROM propiedad WHERE idPropiedad = ?',
      [idPropiedad]
    );

    if (propiedades.length === 0) {
      // Eliminar archivos de Cloudinary
      for (const file of files) {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (err) {
          console.error('Error al eliminar de Cloudinary:', err);
        }
      }
      return res.status(404).json({
        success: false,
        message: 'Propiedad no encontrada'
      });
    }

    // Insertar imágenes en la base de datos
    const imagenesInsertadas = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Cloudinary devuelve la URL en file.path
      const url = file.path;
      
      const [result] = await pool.query(
        'INSERT INTO imagen (idPropiedad, url, orden, es_principal) VALUES (?, ?, ?, ?)',
        [idPropiedad, url, i, i === 0 ? 1 : 0]
      );

      imagenesInsertadas.push({
        idImagen: result.insertId,
        url,
        orden: i,
        es_principal: i === 0
      });
    }

    res.status(201).json({
      success: true,
      message: 'Imágenes subidas exitosamente',
      data: imagenesInsertadas
    });
  } catch (error) {
    // Limpiar archivos de Cloudinary en caso de error
    if (req.files) {
      for (const file of req.files) {
        try {
          await cloudinary.uploader.destroy(file.filename);
        } catch (err) {
          console.error('Error al eliminar de Cloudinary:', err);
        }
      }
    }
    next(error);
  }
};

export const getByPropiedad = async (req, res, next) => {
  try {
    const { idPropiedad } = req.params;

    const [imagenes] = await pool.query(
      'SELECT * FROM imagen WHERE idPropiedad = ? ORDER BY orden, idImagen',
      [idPropiedad]
    );

    res.json({
      success: true,
      data: imagenes
    });
  } catch (error) {
    next(error);
  }
};

export const setPrincipal = async (req, res, next) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const { idImagen } = req.params;

    // Obtener la propiedad de esta imagen
    const [imagenes] = await connection.query(
      'SELECT idPropiedad FROM imagen WHERE idImagen = ?',
      [idImagen]
    );

    if (imagenes.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Imagen no encontrada'
      });
    }

    const idPropiedad = imagenes[0].idPropiedad;

    // Quitar es_principal de todas las imágenes de esta propiedad
    await connection.query(
      'UPDATE imagen SET es_principal = 0 WHERE idPropiedad = ?',
      [idPropiedad]
    );

    // Marcar la nueva imagen como principal
    await connection.query(
      'UPDATE imagen SET es_principal = 1 WHERE idImagen = ?',
      [idImagen]
    );

    await connection.commit();

    res.json({
      success: true,
      message: 'Imagen principal actualizada'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

export const updateOrden = async (req, res, next) => {
  try {
    const { idImagen } = req.params;
    const { orden } = req.body;

    const [result] = await pool.query(
      'UPDATE imagen SET orden = ? WHERE idImagen = ?',
      [orden, idImagen]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Imagen no encontrada'
      });
    }

    res.json({
      success: true,
      message: 'Orden actualizado'
    });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { idImagen } = req.params;

    // Obtener información de la imagen
    const [imagenes] = await pool.query(
      'SELECT url FROM imagen WHERE idImagen = ?',
      [idImagen]
    );

    if (imagenes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Imagen no encontrada'
      });
    }

    const imagen = imagenes[0];

    // Eliminar de la base de datos
    await pool.query('DELETE FROM imagen WHERE idImagen = ?', [idImagen]);

    // Eliminar de Cloudinary
    try {
      // Extraer public_id de la URL de Cloudinary
      const urlParts = imagen.url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const publicId = `inmobiliaria-juliana/propiedades/${fileName.split('.')[0]}`;
      
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error('Error al eliminar de Cloudinary:', err);
    }

    res.json({
      success: true,
      message: 'Imagen eliminada exitosamente'
    });
  } catch (error) {
    next(error);
  }
};
