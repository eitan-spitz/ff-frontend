import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import freud_logo from '../assets/freud_logo.png'

const Navbar = (props) => {
    
        return(
            <div className="nav-bar">

                <div className="nav-logo">
                <img src={freud_logo} alt="freud with a cigar"/>
                <h2>Freud<br />Folds</h2>
                </div>

                <div className="button-div">

                <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'inherit'}} > 
                    <button>Home</button> 
                </NavLink>
                
                <NavLink to="/games" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                    <button>Games</button> 
                </NavLink>
                    
                {props.user ? 
                <>
                    <NavLink to="/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                        <button>Profile</button>
                    </NavLink>

                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <button onClick={()=> {localStorage.removeItem("token")}} >Log Out </button>
                    </NavLink> 
                </>  

                :
                <>
                    <NavLink to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}> 
                        <button>Log In</button>
                    </NavLink>
            
                    <NavLink to="/signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <button>Sign Up</button>
                    </NavLink>   
                </>
                }
                </div>
            </div>
        )
    }


function msp(state){
    return { user: state.user }
}

export default connect(msp, null)(Navbar)