const jwt = require('jsonwebtoken');

// Middleware de autenticación — verifica el token JWT
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ ok: false, msg: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Adjuntar datos del usuario al request
    next();               // Token válido → continuar al controller
  } catch (err) {
    return res.status(403).json({ ok: false, msg: 'Token inválido o expirado' });
  }
};

// Middleware de roles — verifica que el usuario tenga el rol requerido
const verificarRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ ok: false, msg: 'No autenticado' });
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ ok: false, msg: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
  };
};

// Middleware de errores global — captura todos los errores de la app
const manejarErrores = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} —`, err.message);
  res.status(500).json({ ok: false, msg: err.message || 'Error interno del servidor' });
};

module.exports = { verificarToken, verificarRol, manejarErrores };
