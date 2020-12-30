import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return(
        <ul>
            <NavLink to="/home" >
                <li>Home</li>
            </NavLink>
            <NavLink to="/games" >
                <li>Games</li>
            </NavLink>
            <NavLink to="/signup" >
                <li>Sign Up</li>
            </NavLink>
            <NavLink to="/login" >
                <li>Log in</li>
            </NavLink>
        </ul>
    )
}

export default Navbar