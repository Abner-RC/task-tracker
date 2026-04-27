import { NavLink } from "react-router-dom";
import '../styles/components/Navbar.scss'

function Navbar() {
  return (
    <header className='navbar'>
      <NavLink to='/' className='navbar__logo'>
        <h1>Task <span>Tracker</span></h1>
      </NavLink>
      <nav>
        <div>
          <NavLink to='/sign-up' className='navbar__item'>
            Sign Up
          </NavLink>
          <NavLink to='/Log-In' className='navbar__item'>
            Log In
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;