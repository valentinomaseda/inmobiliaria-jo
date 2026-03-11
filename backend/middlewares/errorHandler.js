export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Error de MySQL
  if (err.code) {
    switch (err.code) {
      case 'ER_DUP_ENTRY':
        return res.status(409).json({
          success: false,
          message: 'El registro ya existe'
        });
      case 'ER_NO_REFERENCED_ROW_2':
        return res.status(400).json({
          success: false,
          message: 'Referencia inválida'
        });
      default:
        return res.status(500).json({
          success: false,
          message: 'Error en la base de datos'
        });
    }
  }

  // Error de validación de Multer
  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `Error al subir archivo: ${err.message}`
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor'
  });
};
