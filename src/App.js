import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import GameContainer from './Containers/GameContainer';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import { signupUser, loginUser, returningUser } from './Redux/actions';
import Profile from './Components/Profile';



class App extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem("token")
    if(token){
      fetch('http://localhost:3000//profile', {
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

  render(){
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route path='/profile' render={(routerProps)=> {
            return(
              <Profile routerProps={routerProps} />
            )
          }} />
          <Route path='/games' render={() => <GameContainer />} />

          <Route path='/signup' render={(routerProps) => {
            return(
            <SignupForm submitHandler={this.signupSubmitHandler} routerProps={routerProps}/>
            )
          }} />

          <Route path='/login' render={ (routerProps) => {
            return(
              <LoginForm submitHandler={this.loginSubmitHandler} routerProps={routerProps} />
            )  
            }} />

          <Route path='/home' render={() => <h1 className="welcome">Welcome!</h1>} />
        </Switch>
        
      </div>
    );
  }
}

function mdp(dispatch){
  return {
    signup: (newUserObj) => dispatch(signupUser(newUserObj)),
    login: (userObj) => dispatch(loginUser(userObj)),
    returning: (userObj) => dispatch(returningUser(userObj))
  }
}

export default connect(null, mdp)(App);
