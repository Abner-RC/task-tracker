import { NavLink } from "react-router-dom";
import '../styles/components/Navbar.scss'

function Navbar() {
  return (
    <header className='navbar'>
      <NavLink to='/' className='navbar__logo'>
        <h1>Task <span>Tracker</span></h1>
      </NavLink>
    </header>
  )
}

export default Navbar;