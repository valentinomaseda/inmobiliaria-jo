import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No se proporcionó token de autenticación' 
      });
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Agregar datos del usuario al request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        nombre: decoded.nombre
      };
      
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Error en la autenticación' 
    });
  }
};
