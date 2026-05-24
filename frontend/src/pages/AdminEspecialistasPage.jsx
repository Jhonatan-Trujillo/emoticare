import { useState, useEffect } from 'react';
import {
  getEspecialistas,
  crearEspecialista,
  actualizarEspecialista,
  eliminarEspecialista
} from '../services/especialistas.service';

const formVacio = {
  usuarioId: '',
  especialidad: '',
  condiciones: '',
  modalidad: 'online',
  precioPorHora: '',
};

export default function AdminEspecialistasPage() {
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEspecialistas();
      setEspecialistas(data.data);
    } catch (err) {
      setError('Error al cargar especialistas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await actualizarEspecialista(editandoId, {
          especialidad: form.especialidad,
          condiciones: form.condiciones,
          modalidad: form.modalidad,
          precioPorHora: form.precioPorHora,
        });
        setMensaje('Especialista actualizado correctamente.');
      } else {
        await crearEspecialista(form);
        setMensaje('Especialista creado correctamente.');
      }
      setForm(formVacio);
      setEditandoId(null);
      cargar();
    } catch (err) {
      setError('Error al guardar. Verifica el token de admin.');
    }
  };

  const handleEditar = (especialista) => {
    setEditandoId(especialista.id);
    setForm({
      usuarioId: especialista.usuario_id || '',
      especialidad: especialista.especialidad || '',
      condiciones: especialista.condiciones || '',
      modalidad: especialista.modalidad || 'online',
      precioPorHora: especialista.precio_por_hora || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este especialista?')) return;
    try {
      await eliminarEspecialista(id);
      setMensaje('Especialista eliminado correctamente.');
      cargar();
    } catch (err) {
      setError('Error al eliminar.');
    }
  };

  const handleCancelar = () => {
    setForm(formVacio);
    setEditandoId(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Panel Admin — Especialistas</h1>

      {/* Mensajes */}
      {mensaje && <p style={styles.exito}>{mensaje}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {/* Formulario */}
      <div style={styles.card}>
        <h2 style={styles.subtitulo}>
          {editandoId ? 'Editar Especialista' : 'Nuevo Especialista'}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!editandoId && (
            <input
              name="usuarioId"
              value={form.usuarioId}
              onChange={handleChange}
              placeholder="ID del usuario"
              style={styles.input}
              required
            />
          )}
          <input
            name="especialidad"
            value={form.especialidad}
            onChange={handleChange}
            placeholder="Especialidad"
            style={styles.input}
            required
          />
          <input
            name="condiciones"
            value={form.condiciones}
            onChange={handleChange}
            placeholder="Condiciones (separadas por coma)"
            style={styles.input}
          />
          <select
            name="modalidad"
            value={form.modalidad}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </select>
          <input
            name="precioPorHora"
            value={form.precioPorHora}
            onChange={handleChange}
            placeholder="Precio por hora"
            type="number"
            style={styles.input}
            required
          />
          <div style={styles.botones}>
            <button type="submit" style={styles.btnGuardar}>
              {editandoId ? 'Actualizar' : 'Crear'}
            </button>
            {editandoId && (
              <button type="button" onClick={handleCancelar} style={styles.btnCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabla */}
      <div style={styles.card}>
        <h2 style={styles.subtitulo}>Lista de Especialistas</h2>
        {loading && <p style={styles.mensaje}>Cargando...</p>}
        {!loading && especialistas.length === 0 && (
          <p style={styles.mensaje}>No hay especialistas registrados.</p>
        )}
        {!loading && especialistas.length > 0 && (
          <table style={styles.tabla}>
            <thead>
              <tr>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Especialidad</th>
                <th style={styles.th}>Modalidad</th>
                <th style={styles.th}>Precio/hora</th>
                <th style={styles.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {especialistas.map(e => (
                <tr key={e.id} style={styles.tr}>
                  <td style={styles.td}>{e.nombre}</td>
                  <td style={styles.td}>{e.especialidad}</td>
                  <td style={styles.td}>{e.modalidad}</td>
                  <td style={styles.td}>${Number(e.precio_por_hora).toLocaleString()}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleEditar(e)} style={styles.btnEditar}>
                      Editar
                    </button>
                    <button onClick={() => handleEliminar(e.id)} style={styles.btnEliminar}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  titulo: {
    fontSize: '28px',
    color: '#222',
    marginBottom: '24px',
  },
  subtitulo: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '16px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  botones: {
    display: 'flex',
    gap: '12px',
  },
  btnGuardar: {
    backgroundColor: '#1565c0',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnCancelar: {
    backgroundColor: '#757575',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  tabla: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#e3f2fd',
    color: '#1565c0',
    padding: '12px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#444',
  },
  btnEditar: {
    backgroundColor: '#1565c0',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '8px',
  },
  btnEliminar: {
    backgroundColor: '#c62828',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  exito: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  mensaje: {
    textAlign: 'center',
    color: '#888',
    fontSize: '15px',
  },
};