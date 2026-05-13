const pool = require('../config/db');

const listarUsuarios = async ({ rol, estado }) => {
  let query = 'SELECT id, nombre, correo, rol, verificado, estado, creado_en FROM usuarios WHERE 1=1';
  const params = [];

  if (rol) {
    query += ' AND rol = ?';
    params.push(rol);
  }
  if (estado) {
    query += ' AND estado = ?';
    params.push(estado);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

const cambiarEstadoEspecialista = async (id, decision) => {
  // Verificar que el especialista existe y está pendiente
  const [rows] = await pool.query(
    'SELECT * FROM especialistas WHERE id = ?',
    [id]
  );

  if (rows.length === 0) {
    return { ok: false, msg: 'Especialista no encontrado' };
  }
  if (rows[0].estado !== 'pendiente_aprobacion') {
    return { ok: false, msg: 'El especialista no está en estado pendiente de aprobación' };
  }

  await pool.query(
    'UPDATE especialistas SET estado = ? WHERE id = ?',
    [decision, id]
  );

  const [actualizado] = await pool.query(
    'SELECT * FROM especialistas WHERE id = ?',
    [id]
  );

  return { ok: true, especialista: actualizado[0] };
};

const generarReportes = async ({ fechaInicio, fechaFin }) => {
  const [usuariosActivos] = await pool.query(
    "SELECT COUNT(*) AS total FROM usuarios WHERE estado = 'activo'"
  );

  const [citasProgramadas] = await pool.query(
    "SELECT COUNT(*) AS total FROM citas WHERE estado = 'programada'"
  );

  const [transacciones] = await pool.query(
    "SELECT COUNT(*) AS total FROM pagos WHERE estado = 'aprobado'"
  );

  const [cancelaciones] = await pool.query(
    "SELECT COUNT(*) AS total FROM citas WHERE estado = 'cancelada'"
  );

  const [totalCitas] = await pool.query(
    'SELECT COUNT(*) AS total FROM citas'
  );

  const tasaCancelaciones = totalCitas[0].total > 0
    ? ((cancelaciones[0].total / totalCitas[0].total) * 100).toFixed(1) + '%'
    : '0%';

  return {
    usuariosActivos: usuariosActivos[0].total,
    citasProgramadas: citasProgramadas[0].total,
    transaccionesProcesadas: transacciones[0].total,
    tasaCancelaciones,
    periodo: { fechaInicio: fechaInicio || 'N/A', fechaFin: fechaFin || 'N/A' }
  };
};

module.exports = { listarUsuarios, cambiarEstadoEspecialista, generarReportes };