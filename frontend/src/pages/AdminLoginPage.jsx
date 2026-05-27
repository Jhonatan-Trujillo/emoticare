import { useState } from 'react';
import api from '../api/axiosConfig';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', form);
      const { token, data } = res.data;

      if (data.rol !== 'administrador') {
        setError('No tienes permisos de administrador.');
        return;
      }

      localStorage.setItem('token', token);
      window.location.href = '/admin/especialistas';
    } catch (err) {
      setError('Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Panel Admin</h1>
        <p style={styles.subtitulo}>Inicia sesión para continuar</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            placeholder="Correo electrónico"
            style={styles.input}
            required
          />
          <input
            name="contrasena"
            type="password"
            value={form.contrasena}
            onChange={handleChange}
            placeholder="Contraseña"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '400px',
  },
  titulo: {
    fontSize: '24px',
    color: '#222',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '24px',
    textAlign: 'center',
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
  btn: {
    backgroundColor: '#1565c0',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
  },
};