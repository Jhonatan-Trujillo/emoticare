import Home from './pages/Home';
import EspecialistasPage from './pages/EspecialistasPage';
import AdminEspecialistasPage from './pages/AdminEspecialistasPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  const ruta = window.location.pathname;

  const renderPagina = () => {
    switch (ruta) {
      case '/':
        return <Home />;
      case '/especialistas':
        return <EspecialistasPage />;
      case '/admin/login':
        return <AdminLoginPage />;
      case '/admin/especialistas': {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/admin/login';
          return null;
        }
        return <AdminEspecialistasPage />;
      }
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {renderPagina()}
    </div>
  );
}

export default App;
