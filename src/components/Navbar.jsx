import React from 'react'
import { NavLink, Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <NavLink to="/"> CinemaName</NavLink>
      <NavLink to="/repertoire"> Repertuar</NavLink>
      <Link to="#footer"> Kontakt</Link>
      <NavLink to="/login"> Zaloguj się</NavLink>
      <NavLink to="/register"> Zarejestruj się</NavLink>
    </>
  )
}

export default Navbar