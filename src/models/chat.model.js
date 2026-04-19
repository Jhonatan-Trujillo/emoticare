const pool = require('../config/db');

const listarConversaciones = async (usuarioId) => {
  const [rows] = await pool.query(
    `SELECT * FROM conversaciones
     WHERE participante1_id = ? OR participante2_id = ?
     ORDER BY fecha DESC`,
    [usuarioId, usuarioId]
  );
  return rows;
};

const obtenerMensajes = async (conversacionId, usuarioId) => {
  const [conversacion] = await pool.query(
    `SELECT * FROM conversaciones
     WHERE id = ? AND (participante1_id = ? OR participante2_id = ?)`,
    [conversacionId, usuarioId, usuarioId]
  );

  if (conversacion.length === 0) {
    return { ok: false, msg: 'No tienes acceso a esta conversación' };
  }

  const [mensajes] = await pool.query(
    `SELECT * FROM mensajes
     WHERE conversacion_id = ?
     ORDER BY fecha ASC`,
    [conversacionId]
  );

  return { ok: true, mensajes };
};

module.exports = { listarConversaciones, obtenerMensajes };