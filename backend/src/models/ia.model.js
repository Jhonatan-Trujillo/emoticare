const pool = require('../config/db');

const PALABRAS_CRISIS = ['suicidio', 'autolesión', 'hacerme daño', 'no quiero vivir', 'quitarme la vida'];

const RESPUESTA_CRISIS = {
  mensaje: 'Detectamos que puedes estar atravesando un momento difícil. Por favor comunícate con la Línea 106 (Colombia) o acude a urgencias.',
  recursos: ['Línea 106 - Salud Mental Colombia', 'Cruz Roja: 132']
};

const generarRespuesta = async (usuarioId, mensaje) => {
  const esCrisis = PALABRAS_CRISIS.some(p => mensaje.toLowerCase().includes(p));

  const respuestaTexto = esCrisis
    ? RESPUESTA_CRISIS.mensaje
    : 'Gracias por compartir eso. Estoy aquí para escucharte. ¿Quieres contarme más sobre cómo te sientes?';

  // Guardar mensaje del usuario
  await pool.query(
    'INSERT INTO historial_ia (usuario_id, rol, contenido) VALUES (?, ?, ?)',
    [usuarioId, 'usuario', mensaje]
  );

  // Guardar respuesta de la IA
  await pool.query(
    'INSERT INTO historial_ia (usuario_id, rol, contenido) VALUES (?, ?, ?)',
    [usuarioId, 'asistente', respuestaTexto]
  );

  return {
    respuesta: respuestaTexto,
    esCrisis,
    recursos: esCrisis ? RESPUESTA_CRISIS.recursos : []
  };
};

const obtenerHistorial = async (usuarioId) => {
  const [rows] = await pool.query(
    'SELECT * FROM historial_ia WHERE usuario_id = ? ORDER BY fecha ASC',
    [usuarioId]
  );
  return rows;
};

module.exports = { generarRespuesta, obtenerHistorial };