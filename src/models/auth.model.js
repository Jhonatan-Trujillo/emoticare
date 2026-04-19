const pool = require('../config/db');

const registrarUsuario = async ({ nombre, correo, contrasena, rol }) => {
  // Verificar si el correo ya existe
  const [existe] = await pool.query(
    'SELECT id FROM usuarios WHERE correo = ?',
    [correo]
  );
  if (existe.length > 0) {
    return { ok: false, msg: 'El correo ya está registrado' };
  }

  // Insertar nuevo usuario
  await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)',
    [nombre, correo, contrasena, rol]
  );

  // Generar código de verificación (6 dígitos, expira en 15 minutos)
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  const expira = Date.now() + 15 * 60 * 1000;

  await pool.query(
    'INSERT INTO codigos_verificacion (correo, codigo, expira) VALUES (?, ?, ?)',
    [correo, codigo, expira]
  );

  console.log(`[Simulación] Código de verificación para ${correo}: ${codigo}`);
  return { ok: true };
};

const verificarCodigo = async (correo, codigo) => {
  const [rows] = await pool.query(
    'SELECT * FROM codigos_verificacion WHERE correo = ? AND codigo = ?',
    [correo, codigo]
  );

  if (rows.length === 0) {
    return { ok: false, msg: 'Código incorrecto' };
  }
  if (Date.now() > rows[0].expira) {
    return { ok: false, msg: 'El código ha expirado. Solicita uno nuevo.' };
  }

  // Activar cuenta
  await pool.query(
    'UPDATE usuarios SET verificado = TRUE WHERE correo = ?',
    [correo]
  );

  // Eliminar código usado
  await pool.query(
    'DELETE FROM codigos_verificacion WHERE correo = ?',
    [correo]
  );

  return { ok: true };
};

const autenticarUsuario = async (correo, contrasena) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE correo = ?',
    [correo]
  );

  if (rows.length === 0 || rows[0].contrasena !== contrasena) {
    return { ok: false, msg: 'Credenciales incorrectas' };
  }

  const usuario = rows[0];

  if (!usuario.verificado) {
    return { ok: false, msg: 'Debes verificar tu correo antes de iniciar sesión' };
  }
  if (usuario.estado === 'suspendido') {
    return { ok: false, msg: 'Tu cuenta ha sido suspendida' };
  }

  // En producción: jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET)
  const token = `token_simulado_${usuario.id}_${Date.now()}`;
  const { contrasena: _, ...usuarioPublico } = usuario;
  return { ok: true, token, usuario: usuarioPublico };
};

const autenticarConTercero = async (proveedor, tokenProveedor) => {
  // En producción: validar token con Google/Facebook OAuth2
  const correoSimulado = `usuario_${proveedor}@externo.com`;

  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE correo = ?',
    [correoSimulado]
  );

  let usuario;
  if (rows.length > 0) {
    usuario = rows[0];
  } else {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, rol, verificado) VALUES (?, ?, NULL, ?, TRUE)',
      [`Usuario de ${proveedor}`, correoSimulado, 'paciente']
    );
    const [nuevo] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [result.insertId]
    );
    usuario = nuevo[0];
  }

  const token = `token_simulado_${usuario.id}_${Date.now()}`;
  const { contrasena: _, ...usuarioPublico } = usuario;
  return { ok: true, token, usuario: usuarioPublico };
};

module.exports = { registrarUsuario, verificarCodigo, autenticarUsuario, autenticarConTercero };