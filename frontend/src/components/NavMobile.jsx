import { useState } from 'react';

export default function NavMobile() {
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState('inicio');

  const links = [
    { id: 'inicio', label: 'Inicio', href: '/' },
    { id: 'especialistas', label: 'Especialistas', href: '/especialistas' },
    { id: 'citas', label: 'Mis Citas', href: '/citas' },
    { id: 'contacto', label: 'Contacto', href: '/contacto' },
  ];

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo}> 💙 Emoticare</div>

      {/* Botón hamburguesa */}
      <button style={styles.hamburguesa} onClick={() => setAbierto(!abierto)}>
        {abierto ? '✕' : '☰'}
      </button>

      {/* Menú desplegable */}
      {abierto && (
        <div style={styles.menu}>
          <ul style={styles.ul}>
            {links.map(link => (
              <li key={link.id}>
                <a href={link.href} style={{...styles.link, ...(activo === link.id ? styles.linkActivo : {})}} onClick={() => {setActivo(link.id); setAbierto(false);}}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={styles.botones}>
            <a href="/login" style={styles.btnLogin}>Iniciar sesión</a>
            <a href="/registro" style={styles.btnRegistro}>Registrarse</a>
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    height: '60px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1565c0',
  },
  hamburguesa: {
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1565c0',
  },
  menu: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: '12px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
  },
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  link: {
    textDecoration: 'none',
    color: '#555',
    fontSize: '16px',
    fontWeight: '500',
    padding: '8px 0',
    display: 'block',
    borderBottom: '2px solid transparent',
  },
  linkActivo: {
    color: '#1565c0',
    borderBottom: '2px solid #1565c0',
  },
  botones: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '16px 20px',
  },
  btnLogin: {
    textDecoration: 'none',
    color: '#1565c0',
    border: '1px solid #1565c0',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
  },
  btnRegistro: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#1565c0',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
  },
};