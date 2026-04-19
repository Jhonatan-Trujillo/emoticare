const pool = require('../config/db');

const procesarPago = async ({ usuarioId, citaId, metodoPago }) => {
  // Verificar que la cita existe y está en estado pendiente_pago
  const [citas] = await pool.query(
    `SELECT * FROM citas WHERE id = ? AND paciente_id = ? AND estado = 'pendiente_pago'`,
    [citaId, usuarioId]
  );
  if (citas.length === 0) {
    return { ok: false, msg: 'Cita no encontrada o no está pendiente de pago' };
  }

  // En producción: llamar a pasarela de pagos externa (Stripe, PayU, etc.)
  const estadoSimulado = 'aprobado';
  const monto = citas[0].precio_por_hora || 80000;

  const [result] = await pool.query(
    `INSERT INTO pagos (usuario_id, cita_id, metodo_pago, estado, monto)
     VALUES (?, ?, ?, ?, ?)`,
    [usuarioId, citaId, metodoPago, estadoSimulado, monto]
  );

  // Si el pago fue aprobado, actualizar estado de la cita a programada
  if (estadoSimulado === 'aprobado') {
    await pool.query(
      `UPDATE citas SET estado = 'programada', estado_pago = 'aprobado' WHERE id = ?`,
      [citaId]
    );
  }

  const [rows] = await pool.query('SELECT * FROM pagos WHERE id = ?', [result.insertId]);
  return { ok: true, transaccion: rows[0] };
};

const historialPorUsuario = async (usuarioId) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.fecha, c.hora, c.modalidad
     FROM pagos p
     JOIN citas c ON p.cita_id = c.id
     WHERE p.usuario_id = ?
     ORDER BY p.fecha DESC`,
    [usuarioId]
  );
  return rows;
};

module.exports = { procesarPago, historialPorUsuario };