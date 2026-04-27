import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './styles/index.scss';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path='/'
            element={user ? <Home /> : <Navigate to='/log-in' />}>
          </Route>
          <Route
            path='/sign-up'
            element={!user ? <SignUp /> : <Navigate to='/' />}>
          </Route>
          <Route
            path='/log-in'
            element={!user ? <LogIn /> : <Navigate to='/' />}>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;