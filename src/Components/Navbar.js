import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
    render(){
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
                {this.props.user ? 
                    <li onClick={()=> {localStorage.removeItem("token")}} >Log Out</li>
                :
                    <NavLink to="/login" >
                        <li>Log in</li>
                    </NavLink>
                }
            </ul>
        )
    }
}

function msp(state){
    return { user: state.user }
}

export default connect(msp, null)(Navbar)