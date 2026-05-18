import Home from './pages/Home';
import EspecialistasPage from './pages/EspecialistasPage';

function App() {
  // Enrutamiento simple sin React Router
  const ruta = window.location.pathname;

  const renderPagina = () => {
    switch (ruta) {
      case '/':
        return <Home />;
      case '/especialistas':
        return <EspecialistasPage />;
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
