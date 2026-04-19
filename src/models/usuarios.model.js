const pool = require('../config/db');

const buscarPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, nombre, correo, rol, verificado, estado, creado_en FROM usuarios WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const actualizarPerfil = async (id, { nombre, telefono, fotoPerfil }) => {
  const usuario = await buscarPorId(id);
  if (!usuario) {
    return { ok: false, msg: 'Usuario no encontrado' };
  }

  // Solo actualizar campos que llegaron en el body
  await pool.query(
    `UPDATE usuarios
     SET nombre     = COALESCE(?, nombre)
     WHERE id = ?`,
    [nombre || null, id]
  );

  const actualizado = await buscarPorId(id);
  return { ok: true, usuario: actualizado };
};

module.exports = { buscarPorId, actualizarPerfil };