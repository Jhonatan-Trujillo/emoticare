import { useState } from 'react';

export default function NavDesktop() {
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
      <div style={styles.logo}>
        💙 Emoticare
      </div>

      {/* Links */}
      <ul style={styles.ul}>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.href} style={{...styles.link, ...(activo === link.id ? styles.linkActivo : {})}} onClick={() => setActivo(link.id)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Botones */}
      <div style={styles.botones}>
        <a href="/login" style={styles.btnLogin}>Iniciar sesión</a>
        <a href="/registro" style={styles.btnRegistro}>Registrarse</a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '64px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1565c0',
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    gap: '32px',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#555',
    fontSize: '15px',
    fontWeight: '500',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
  },
  linkActivo: {
    color: '#1565c0',
    borderBottom: '2px solid #1565c0',
  },
  botones: {
    display: 'flex',
    gap: '12px',
  },
  btnLogin: {
    textDecoration: 'none',
    color: '#1565c0',
    border: '1px solid #1565c0',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  btnRegistro: {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#1565c0',
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
};