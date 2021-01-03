import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
    render(){
        return(
            <div className="nav-bar">
                <button>
                    <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}} > Home </NavLink>
                </button>

                <button>
                    <NavLink to="/games" style={{ color: 'inherit', textDecoration: 'inherit'}}> Games </NavLink>
                </button>

                <button>
                    <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>Sign Up </NavLink>   
                </button>
                
                {this.props.user ? 

                <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <button onClick={()=> {localStorage.removeItem("token")}} >Log Out</button>
                </NavLink>   

                :
                
                <button>
                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}> Log In </NavLink>
                </button>
                
                }
            </div>
        )
    }
}

function msp(state){
    return { user: state.user }
}

export default connect(msp, null)(Navbar)