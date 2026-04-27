import { NavLink } from "react-router-dom";
import TaskTrackerLogo from '../assets/images/logo.png';
import '../styles/components/Navbar.scss'

function Navbar() {
  return (
    <header className='navbar'>
      <NavLink to='/' className='navbar__logo'>
        <img src={TaskTrackerLogo} alt="Task Tracker Logo" />
        <h1>Task <span>Tracker</span></h1>
      </NavLink>
      <nav className="navigation">
        <div className="navigation__container">
          <NavLink to='/sign-up' className='navbar__item'>
            Sign Up
          </NavLink>
          <NavLink to='/log-In' className='navbar__item'>
            Log In
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;