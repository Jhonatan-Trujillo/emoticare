export default function EspecialistaCard({ especialista }) {
  return (
    <div style={styles.card}>
      {/* Avatar */}
      <div style={styles.avatar}>
        {especialista.nombre.charAt(0)}
      </div>

      {/* Info */}
      <div style={styles.info}>
        <h3 style={styles.nombre}>{especialista.nombre}</h3>
        <p style={styles.especialidad}>{especialista.especialidad}</p>

        {/* Modalidad */}
        <span style={{
          ...styles.badge,
          backgroundColor: especialista.modalidad === 'online' ? '#e8f5e9' : '#e3f2fd',
          color: especialista.modalidad === 'online' ? '#1565c0' : '#1565c0',
        }}>
          {especialista.modalidad === 'online' ? '🌐 Online' : '🏥 Presencial'}
        </span>

        {/* Condiciones */}
        <div style={styles.condiciones}>
          {especialista.condiciones?.split(',').map((c, i) => (
            <span key={i} style={styles.tag}>{c.trim()}</span>
          ))}
        </div>

        {/* Precio y calificación */}
        <div style={styles.footer}>
          <span style={styles.precio}>
            💰 ${Number(especialista.precio_por_hora).toLocaleString()} / hora
          </span>
          <span style={styles.calificacion}>
            ⭐ {Number(especialista.calificacion_promedio).toFixed(1)}
          </span>
        </div>

        {/* Botón */}
        <button style={styles.btn}>
          Agendar cita
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    gap: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    marginBottom: '16px',
    transition: 'transform 0.2s',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#1565c0',
    color: '#fff',
    fontSize: '28px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  info: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  nombre: {
    margin: 0,
    fontSize: '18px',
    color: '#222',
    fontWeight: '600',
  },
  especialidad: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    width: 'fit-content',
  },
  condiciones: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tag: {
    backgroundColor: '#f5f5f5',
    color: '#555',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '12px',
  },
  footer: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  precio: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1565c0',
  },
  calificacion: {
    fontSize: '14px',
    color: '#f59e0b',
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#1565c0',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: 'fit-content',
  },
};