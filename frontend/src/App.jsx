import Home from './pages/Home';
import EspecialistasPage from './pages/EspecialistasPage';
import AdminEspecialistasPage from './pages/AdminEspecialistasPage';

function App() {
  const ruta = window.location.pathname;

  const renderPagina = () => {
    switch (ruta) {
      case '/':
        return <Home />;
      case '/especialistas':
        return <EspecialistasPage />;
      case '/admin/especialistas':
        return <AdminEspecialistasPage />;
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
