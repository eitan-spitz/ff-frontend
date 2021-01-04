import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
    
        return(
            <div className="nav-bar">
                
                <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}} > 
                    <button>Home</button> 
                </NavLink>
                
                <NavLink to="/games" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Games</button> 
                </NavLink>
                    
                {props.user ? 

                <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <button onClick={()=> {localStorage.removeItem("token")}} >Log Out </button>
                </NavLink>   

                :
                <>
                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                        <button> Log In</button>
                    </NavLink>
            
                    <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <button>Sign Up</button>
                    </NavLink>   
                </>
                }
            </div>
        )
    }


function msp(state){
    return { user: state.user }
}

export default connect(msp, null)(Navbar)