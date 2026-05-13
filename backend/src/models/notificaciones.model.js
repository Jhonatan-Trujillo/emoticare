const pool = require('../config/db');

const listarPorUsuario = async (usuarioId) => {
  const [rows] = await pool.query(
    `SELECT * FROM notificaciones
     WHERE usuario_id = ?
     ORDER BY fecha DESC`,
    [usuarioId]
  );
  return rows;
};

const marcarLeida = async (id, usuarioId) => {
  const [rows] = await pool.query(
    'SELECT * FROM notificaciones WHERE id = ? AND usuario_id = ?',
    [id, usuarioId]
  );

  if (rows.length === 0) {
    return { ok: false, msg: 'Notificación no encontrada' };
  }

  await pool.query(
    'UPDATE notificaciones SET leida = TRUE WHERE id = ?',
    [id]
  );

  const [actualizada] = await pool.query(
    'SELECT * FROM notificaciones WHERE id = ?',
    [id]
  );

  return { ok: true, notificacion: actualizada[0] };
};

module.exports = { listarPorUsuario, marcarLeida };