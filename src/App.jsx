import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';

function App() {
  // const isLogged = useSelector(state => state.auth.isLogged);

  return (
    <div className="app">
      <BrowserRouter>
        {/* {(isLogged)
          ?
          <Routes>
            <Route element={<AuthRoute roles={["employee", "company"]} />}>
              <Route path='*' element={<Navigate to="/chat" />} />
              <Route path='home' element={<Home />} />
              <Route path='tasks' element={<Tasks />} />
              <Route path='projects' element={<Projects />} />
              <Route path='chat' >
                <Route path='' element={<Chat channelsInfo={channelsInfo} setChannelsInfo={setChannelsInfo} />} />
                <Route path=':channelId' element={<Chat channelsInfo={channelsInfo} setChannelsInfo={setChannelsInfo} />} />
              </Route>
              <Route path='search' element={<Search />} />
              <Route path='groups' element={<Groups />} />
              <Route path='notifications' element={<Notifications />} />
              <Route path='company' element={<Company />} />
              <Route path='settings' element={<Settings />} />
              <Route path='register' element={<Register />} />
            </Route>

            <Route element={<AuthRoute roles={["company"]} />}>
              <Route path='employees' element={<Employees channelsInfo={channelsInfo} />} />
              <Route path='invitations' element={<Invitations />} />
            </Route>

            <Route element={<AuthRoute roles={["employee"]} />}>
            </Route>
          </Routes>
          :
          <Routes>
            <Route path='*' element={<Navigate to="/login" />} />
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
            <Route path='confirmation' element={<Confirmation />} />
          </Routes>
        } */}
      </BrowserRouter>
    </div>
  );
}

export default App;
