import { useSelector } from 'react-redux';
import { Routes } from 'react-router-dom';
import routes from './routes/_exports';
import './App.scss';

function App() {
  const { info: authInfo } = useSelector((state) => state.auth);
  const { isLogged } = authInfo;

  console.log('authInfo', authInfo);

  return (
    <div className="app">
      <Routes>
        {isLogged ? (
          <>
            {routes.admin}
            {routes.user}
            {routes.custom}
          </>
        ) : (
          routes.public
        )}
      </Routes>
    </div>
  );
}

export default App;
