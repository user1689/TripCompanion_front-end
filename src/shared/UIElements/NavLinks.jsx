import React, { useContext } from 'react'
import './NavLinks.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'


export default function NavLinks() {
    const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
        <li>
            <NavLink to='/' exact>ALL USERS</NavLink>
        </li>
        <li>
            {auth.isLoggedIn && <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>}
        </li>
        <li>
            {auth.isLoggedIn && <NavLink to='/places/new'>ADD PLACES</NavLink>}
        </li>
        <li>
            {!auth.isLoggedIn && <NavLink to='/auth'>AUTHENTICATE</NavLink>}
        </li>
        <li>
            {auth.isLoggedIn && <button onClick={auth.logout}>LOG OUT</button>}
        </li>
    </ul>
  )
}
