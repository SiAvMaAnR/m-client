import { Routes, BrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/Admin';
import UserRoutes from './routes/User';
import PublicRoutes from './routes/Public';
import CustomRoutes from './routes/Custom';
import useAuth from './hooks/useAuth';
import './App.scss';

function App() {
  // const { isLogged } = useAuth();
  // console.log('isLogged', isLogged);
  const isLogged = false;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {PublicRoutes()}

          {isLogged && (
            <>
              {AdminRoutes()}
              {UserRoutes()}
              {CustomRoutes()}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
