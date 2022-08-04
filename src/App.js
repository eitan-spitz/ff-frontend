import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import GameContainer from './Containers/GameContainer';
import SignupForm from './Components/SignupForm';
import EditForm from './Components/EditForm';
import LoginForm from './Components/LoginForm';
import Navbar from './Components/Navbar';
import { signupUser, loginUser, returningUser, editUser , deleteUser} from './Redux/actions';
import Profile from './Components/Profile';
import Welcome from './Containers/Welcome';
import {URL} from './index'


class App extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem("token")
    if(token){
      fetch(`${URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": 'Bearer ' + token
        }
      })
        .then(r => r.json())
        .then(returningUser => {
          this.props.returning(returningUser.user)
        })
    }
  }

  signupSubmitHandler = (userObj) => {
      this.props.signup(userObj)
  }

  loginSubmitHandler = (userObj) => {
      this.props.login(userObj)
  }

  editSubmitHandler = (userObj) => {
    this.props.edit(userObj, this.props.user.id)
  }

  render(){
    return (
      <div className="App" >
        <Switch>
          <Route path='/' render={ (routerProps) => {
            return(
              <LoginForm submitHandler={this.loginSubmitHandler} routerProps={routerProps} />
            )  
            }} />
        </Switch>
        
      </div>
    );
  }
}
function msp(state){
  return{
    user: state.user
  }
}

function mdp(dispatch){
  return {
    signup: (newUserObj) => dispatch(signupUser(newUserObj)),
    login: (userObj) => dispatch(loginUser(userObj)),
    returning: (userObj) => dispatch(returningUser(userObj)),
    edit: (userObj, userId) => dispatch(editUser(userObj, userId))
  }
}

export default connect(msp, mdp)(App);
