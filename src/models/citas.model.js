const pool = require('../config/db');

const agendar = async ({ pacienteId, especialistaId, fecha, hora, modalidad }) => {
  // Validar que la fecha sea futura
  const fechaCita = new Date(`${fecha}T${hora}`);
  if (fechaCita <= new Date()) {
    return { ok: false, msg: 'La fecha y hora de la cita deben ser futuras' };
  }

  // Validar que el paciente no tenga otra cita en el mismo horario
  const [conflicto] = await pool.query(
    `SELECT id FROM citas
     WHERE paciente_id = ? AND fecha = ? AND hora = ? AND estado != 'cancelada'`,
    [pacienteId, fecha, hora]
  );
  if (conflicto.length > 0) {
    return { ok: false, msg: 'Ya tienes una cita agendada en ese horario' };
  }

  const [result] = await pool.query(
    `INSERT INTO citas (paciente_id, especialista_id, fecha, hora, modalidad, estado, estado_pago)
     VALUES (?, ?, ?, ?, ?, 'pendiente_pago', 'pendiente')`,
    [pacienteId, especialistaId, fecha, hora, modalidad]
  );

  const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [result.insertId]);
  return { ok: true, cita: rows[0] };
};

const listarPorUsuario = async (usuarioId, { estado, fechaInicio, fechaFin }) => {
  let query = `
    SELECT * FROM citas
    WHERE (paciente_id = ? OR especialista_id = ?)
  `;
  const params = [usuarioId, usuarioId];

  if (estado) {
    query += ' AND estado = ?';
    params.push(estado);
  }
  if (fechaInicio) {
    query += ' AND fecha >= ?';
    params.push(fechaInicio);
  }
  if (fechaFin) {
    query += ' AND fecha <= ?';
    params.push(fechaFin);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

const buscarPorId = async (id, usuarioId) => {
  const [rows] = await pool.query(
    `SELECT * FROM citas
     WHERE id = ? AND (paciente_id = ? OR especialista_id = ?)`,
    [id, usuarioId, usuarioId]
  );
  return rows[0] || null;
};

const cancelar = async (id, usuarioId) => {
  const cita = await buscarPorId(id, usuarioId);
  if (!cita) return { ok: false, msg: 'Cita no encontrada o sin permiso' };
  if (cita.estado !== 'programada') return { ok: false, msg: 'Solo se pueden cancelar citas en estado programada' };

  await pool.query('UPDATE citas SET estado = ? WHERE id = ?', ['cancelada', id]);

  const fechaCita = new Date(`${cita.fecha}T${cita.hora}`);
  const horasRestantes = (fechaCita - new Date()) / (1000 * 60 * 60);
  const reembolso = horasRestantes >= 24;

  const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
  return { ok: true, cita: rows[0], reembolso };
};

const modificar = async (id, usuarioId, { fecha, hora, modalidad }) => {
  const cita = await buscarPorId(id, usuarioId);
  if (!cita) return { ok: false, msg: 'Cita no encontrada o sin permiso' };
  if (cita.estado !== 'programada') return { ok: false, msg: 'Solo se pueden modificar citas en estado programada' };

  if (fecha) {
    const fechaNueva = new Date(`${fecha}T${hora || cita.hora}`);
    if (fechaNueva <= new Date()) {
      return { ok: false, msg: 'La nueva fecha debe ser futura' };
    }
  }

  await pool.query(
    `UPDATE citas
     SET fecha     = COALESCE(?, fecha),
         hora      = COALESCE(?, hora),
         modalidad = COALESCE(?, modalidad)
     WHERE id = ?`,
    [fecha || null, hora || null, modalidad || null, id]
  );

  const [rows] = await pool.query('SELECT * FROM citas WHERE id = ?', [id]);
  return { ok: true, cita: rows[0] };
};

module.exports = { agendar, listarPorUsuario, buscarPorId, cancelar, modificar };