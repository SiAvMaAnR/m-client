import { Routes, BrowserRouter } from 'react-router-dom';
import AdminRoutes from './routes/Admin';
import UserRoutes from './routes/User';
import './App.scss';

function App() {
  // const isLogged = useSelector(state => state.auth.isLogged);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <AdminRoutes isLogged />
          <UserRoutes isLogged />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
