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

const cambiarEstado = async (id, nuevoEstado) => {
  const [result] = await pool.query(
    'UPDATE especialistas SET estado = ? WHERE id = ?',
    [nuevoEstado, id]
  );
  if (result.affectedRows === 0) return null;

  const [rows] = await pool.query('SELECT * FROM especialistas WHERE id = ?', [id]);
  return rows[0];
};

module.exports = { listar, buscarPorId, cambiarEstado };