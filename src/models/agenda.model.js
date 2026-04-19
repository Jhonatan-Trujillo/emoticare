const pool = require('../config/db');

const agregarFranja = async ({ especialistaId, fechaInicio, fechaFin }) => {
  // Validar que la franja sea futura
  if (new Date(fechaInicio) <= new Date()) {
    return { ok: false, msg: 'La franja horaria debe ser futura' };
  }

  // Validar superposición con franjas existentes
  const [superposicion] = await pool.query(
    `SELECT id FROM agenda_disponibilidad
     WHERE especialista_id = ?
     AND ? < fecha_fin AND ? > fecha_inicio`,
    [especialistaId, fechaInicio, fechaFin]
  );
  if (superposicion.length > 0) {
    return { ok: false, msg: 'La franja se superpone con una ya registrada' };
  }

  const [result] = await pool.query(
    `INSERT INTO agenda_disponibilidad (especialista_id, fecha_inicio, fecha_fin)
     VALUES (?, ?, ?)`,
    [especialistaId, fechaInicio, fechaFin]
  );

  const [rows] = await pool.query(
    'SELECT * FROM agenda_disponibilidad WHERE id = ?',
    [result.insertId]
  );
  return { ok: true, franja: rows[0] };
};

const eliminarFranja = async (id, especialistaId) => {
  const [rows] = await pool.query(
    'SELECT * FROM agenda_disponibilidad WHERE id = ?',
    [id]
  );
  if (rows.length === 0) return { ok: false, msg: 'Franja no encontrada' };

  if (rows[0].especialista_id != especialistaId) {
    return { ok: false, msg: 'No tienes permiso para eliminar esta franja' };
  }

  // Verificar si hay citas en ese horario
  const [citas] = await pool.query(
    `SELECT id FROM citas
     WHERE especialista_id = ?
     AND fecha BETWEEN DATE(?) AND DATE(?)
     AND estado != 'cancelada'`,
    [especialistaId, rows[0].fecha_inicio, rows[0].fecha_fin]
  );
  if (citas.length > 0) {
    return { ok: false, status: 409, msg: 'Existe una cita en esta franja. Cancélala primero.' };
  }

  await pool.query('DELETE FROM agenda_disponibilidad WHERE id = ?', [id]);
  return { ok: true };
};

module.exports = { agregarFranja, eliminarFranja };