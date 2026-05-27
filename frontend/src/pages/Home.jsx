import NavDesktop from '../components/NavDesktop';
import NavMobile from '../components/NavMobile';

export default function Home() {
  const isMobile = window.innerWidth <= 768;

  return (
    <div>
      {/* Navegación */}
      {isMobile ? <NavMobile /> : <NavDesktop />}

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContenido}>
          <h1 style={styles.heroTitulo}>
            Tu salud mental <span style={styles.heroVerde}>importa</span>
          </h1>
          <p style={styles.heroSubtitulo}>
            Conectamos pacientes con los mejores especialistas en salud mental.
            Agenda tu cita de forma fácil, rápida y segura.
          </p>
          <div style={styles.heroBotones}>
            <a href="/especialistas" style={styles.btnPrimario}>
              Ver especialistas
            </a>
            <a href="/registro" style={styles.btnSecundario}>
              Crear cuenta gratis
            </a>
          </div>
        </div>

        {/* Imagen decorativa */}
        <div style={styles.heroImagen}>
          <div style={styles.circulo}>🧠</div>
        </div>
      </section>

      {/* Sección — ¿Cómo funciona? */}
      <section style={styles.seccion}>
        <h2 style={styles.seccionTitulo}>¿Cómo funciona?</h2>
        <div style={styles.pasos}>
          {[
            { emoji: '🔍', titulo: 'Busca', desc: 'Encuentra el especialista ideal según tu necesidad y modalidad.' },
            { emoji: '📅', titulo: 'Agenda', desc: 'Selecciona el horario que mejor se adapte a ti.' },
            { emoji: '💬', titulo: 'Consulta', desc: 'Conéctate con tu especialista de forma online o presencial.' },
          ].map((paso, i) => (
            <div key={i} style={styles.paso}>
              <div style={styles.pasoEmoji}>{paso.emoji}</div>
              <h3 style={styles.pasoTitulo}>{paso.titulo}</h3>
              <p style={styles.pasoDesc}>{paso.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección — Especialidades */}
      <section style={{ ...styles.seccion, backgroundColor: '#e3f2fd' }}>
        <h2 style={styles.seccionTitulo}>Especialidades</h2>
        <div style={styles.especialidades}>
          {[
            { emoji: '🧠', nombre: 'Psicología clínica' },
            { emoji: '💊', nombre: 'Psiquiatría' },
            { emoji: '😌', nombre: 'Manejo del estrés' },
            { emoji: '😔', nombre: 'Depresión y ansiedad' },
            { emoji: '👫', nombre: 'Terapia de pareja' },
            { emoji: '👶', nombre: 'Psicología infantil' },
          ].map((esp, i) => (
            <div key={i} style={styles.especialidadCard}>
              <span style={styles.especialidadEmoji}>{esp.emoji}</span>
              <span style={styles.especialidadNombre}>{esp.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitulo}>¿Listo para comenzar?</h2>
        <p style={styles.ctaDesc}>
          Más de 100 especialistas esperan para ayudarte.
        </p>
        <a href="/especialistas" style={styles.btnPrimario}>
          Explorar especialistas
        </a>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Emoticare — Todos los derechos reservados</p>
        <a href="/admin/login" style={styles.adminLink}>
          Acceso administrativo
        </a>
      </footer>
    </div>
  );
}

const styles = {
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 60px',
    backgroundColor: '#e8eaf6',
    gap: '40px',
    flexWrap: 'wrap',
  },
  heroContenido: {
    maxWidth: '520px',
  },
  heroTitulo: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#222',
    margin: 0,
    lineHeight: 1.2,
  },
  heroVerde: {
    color: '#1565c0',
  },
  heroSubtitulo: {
    fontSize: '18px',
    color: '#555',
    marginTop: '16px',
    lineHeight: 1.6,
  },
  heroBotones: {
    display: 'flex',
    gap: '16px',
    marginTop: '32px',
    flexWrap: 'wrap',
  },
  heroImagen: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circulo: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#1565c0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '80px',
  },
  btnPrimario: {
    textDecoration: 'none',
    backgroundColor: '#1565c0',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
  btnSecundario: {
    textDecoration: 'none',
    color: '#1565c0',
    border: '2px solid #1565c0',
    padding: '14px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
  seccion: {
    padding: '60px 60px',
    textAlign: 'center',
  },
  seccionTitulo: {
    fontSize: '32px',
    color: '#222',
    marginBottom: '40px',
  },
  pasos: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
  },
  paso: {
    maxWidth: '220px',
    textAlign: 'center',
  },
  pasoEmoji: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  pasoTitulo: {
    fontSize: '20px',
    color: '#222',
    marginBottom: '8px',
  },
  pasoDesc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: 1.6,
  },
  especialidades: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  especialidadCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#fff',
    padding: '20px 24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    minWidth: '140px',
  },
  especialidadEmoji: {
    fontSize: '32px',
  },
  especialidadNombre: {
    fontSize: '13px',
    color: '#444',
    fontWeight: '500',
    textAlign: 'center',
  },
  cta: {
    padding: '80px 60px',
    textAlign: 'center',
    backgroundColor: '#1565c0',
  },
  ctaTitulo: {
    fontSize: '36px',
    color: '#fff',
    margin: 0,
  },
  ctaDesc: {
    fontSize: '18px',
    color: '#bbdefb',
    marginTop: '12px',
    marginBottom: '32px',
  },
  footer: {
    textAlign: 'center',
    padding: '24px',
    backgroundColor: '#0d47a1',
    color: '#90caf9',
    fontSize: '14px',
  },
  adminLink: {
  color: '#4a6fa5',
  fontSize: '12px',
  textDecoration: 'none',
  marginTop: '8px',
  display: 'inline-block',
  },
};