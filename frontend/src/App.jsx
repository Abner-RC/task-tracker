import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './styles/index.scss';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/log-in' element={<LogIn />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;