import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './styles/index.scss';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;