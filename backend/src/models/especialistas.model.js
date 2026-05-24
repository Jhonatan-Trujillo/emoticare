const pool = require('../config/db');

const listar = async ({ nombre, especialidad, condicion, modalidad }) => {
  let query = `
    SELECT e.id, u.nombre, u.correo, e.especialidad, e.condiciones,
           e.modalidad, e.precio_por_hora, e.calificacion_promedio, e.total_consultas
    FROM especialistas e
    JOIN usuarios u ON e.usuario_id = u.id
    WHERE e.estado = 'aprobado'
  `;
  const params = [];

  if (nombre) {
    query += ' AND u.nombre LIKE ?';
    params.push(`%${nombre}%`);
  }
  if (especialidad) {
    query += ' AND e.especialidad LIKE ?';
    params.push(`%${especialidad}%`);
  }
  if (condicion) {
    query += ' AND e.condiciones LIKE ?';
    params.push(`%${condicion}%`);
  }
  if (modalidad) {
    query += ' AND e.modalidad = ?';
    params.push(modalidad);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

const buscarPorId = async (id) => {
  const [rows] = await pool.query(
    `SELECT e.id, u.nombre, u.correo, e.especialidad, e.condiciones,
            e.modalidad, e.precio_por_hora, e.calificacion_promedio, e.total_consultas
     FROM especialistas e
     JOIN usuarios u ON e.usuario_id = u.id
     WHERE e.id = ? AND e.estado = 'aprobado'`,
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ usuarioId, especialidad, condiciones, modalidad, precioPorHora }) => {
  // Verificar que el usuario existe
  const [usuario] = await pool.query(
    'SELECT id, rol FROM usuarios WHERE id = ?',
    [usuarioId]
  );
  if (usuario.length === 0) {
    return { ok: false, msg: 'El usuario no existe' };
  }

  // Verificar que el usuario no sea ya un especialista
  const [yaExiste] = await pool.query(
    'SELECT id FROM especialistas WHERE usuario_id = ?',
    [usuarioId]
  );
  if (yaExiste.length > 0) {
    return { ok: false, msg: 'Este usuario ya está registrado como especialista' };
  }

  const [result] = await pool.query(
    `INSERT INTO especialistas (usuario_id, especialidad, condiciones, modalidad, precio_por_hora, estado)
     VALUES (?, ?, ?, ?, ?, 'aprobado')`,
    [usuarioId, especialidad, condiciones, modalidad, precioPorHora]
  );

  const [rows] = await pool.query('SELECT * FROM especialistas WHERE id = ?', [result.insertId]);
  return { ok: true, data: rows[0] };
};

const actualizar = async (id, { especialidad, condiciones, modalidad, precioPorHora }) => {
  const [result] = await pool.query(
    `UPDATE especialistas
     SET especialidad     = COALESCE(?, especialidad),
         condiciones      = COALESCE(?, condiciones),
         modalidad        = COALESCE(?, modalidad),
         precio_por_hora  = COALESCE(?, precio_por_hora)
     WHERE id = ?`,
    [especialidad || null, condiciones || null, modalidad || null, precioPorHora || null, id]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await pool.query('SELECT * FROM especialistas WHERE id = ?', [id]);
  return rows[0];
};

const eliminar = async (id) => {
  const [especialista] = await pool.query(
    'SELECT * FROM especialistas WHERE id = ?',
    [id]
  );

  if (especialista.length === 0) return { ok: false, msg: 'Especialista no encontrado' };

  // Verificar si tiene citas programadas
  const [citas] = await pool.query(
    `SELECT id FROM citas WHERE especialista_id = ? AND estado = 'programada'`,
    [id]
  );
  if (citas.length > 0) {
    return { ok: false, msg: 'No se puede eliminar, tiene citas programadas' };
  }

  await pool.query('DELETE FROM especialistas WHERE id = ?', [id]);
  return { ok: true };
};

const cambiarEstado = async (id, nuevoEstado) => {
  const [result] = await pool.query(
    'UPDATE especialistas SET estado = ? WHERE id = ?',
    [nuevoEstado, id]
  );
  if (result.affectedRows === 0) return null;

  const [rows] = await pool.query('SELECT * FROM especialistas WHERE id = ?', [id]);
  return rows[0];
};

module.exports = { listar, buscarPorId, crear, actualizar, eliminar, cambiarEstado };