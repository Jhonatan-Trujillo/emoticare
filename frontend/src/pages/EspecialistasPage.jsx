import { useState, useEffect } from 'react';
import { getEspecialistas } from '../services/especialistas.service';
import EspecialistaCard from '../components/EspecialistaCard';

export default function EspecialistasPage() {
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    modalidad: '',
    especialidad: '',
  });

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEspecialistas(filtros);
      setEspecialistas(data.data);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('Sin conexión con el servidor. Verifica que el backend esté corriendo.');
      } else {
        setError('Error al cargar los especialistas.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleFiltro = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    cargar();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Nuestros Especialistas</h1>
      <p style={styles.subtitulo}>
        Encuentra el profesional de salud mental ideal para ti
      </p>

      {/* Filtros */}
      <form onSubmit={handleBuscar} style={styles.filtros}>
        <select name="modalidad" value={filtros.modalidad} onChange={handleFiltro} style={styles.select}>
          <option value="">Todas las modalidades</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>

        <input
          name="especialidad"
          value={filtros.especialidad}
          onChange={handleFiltro}
          placeholder="Buscar por especialidad..."
          style={styles.input}
        />

        <button type="submit" style={styles.btnBuscar}>
          Buscar
        </button>
      </form>

      {/* Contenido */}
      {loading && <p style={styles.mensaje}>Cargando especialistas...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && especialistas.length === 0 && (
        <p style={styles.mensaje}>No se encontraron especialistas.</p>
      )}
      {!loading && !error && especialistas.map(e => (
        <EspecialistaCard key={e.id} especialista={e} />
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  titulo: {
    fontSize: '32px',
    color: '#222',
    margin: 0,
  },
  subtitulo: {
    fontSize: '16px',
    color: '#666',
    marginTop: '8px',
    marginBottom: '32px',
  },
  filtros: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    color: '#444',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minWidth: '200px',
  },
  btnBuscar: {
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  mensaje: {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
    marginTop: '40px',
  },
  error: {
    textAlign: 'center',
    color: '#c62828',
    fontSize: '16px',
    marginTop: '40px',
  },
};