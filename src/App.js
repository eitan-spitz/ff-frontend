import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import GameContainer from './Containers/GameContainer';
import SignupForm from './Components/SignupForm';
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import { signupUser, loginUser } from './Redux/actions';


class App extends React.Component {

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
          <Route path='/home' render={() => <h1>Welcome!</h1>} />
          <Route path='/games' render={() => <GameContainer />} />
          <Route path='/signup' render={() => <SignupForm submitHandler={this.signupSubmitHandler} />} />
          <Route path='/login' render={() => <LoginForm submitHandler={this.loginSubmitHandler} />} />
        </Switch>
        
      </div>
    );
  }
}

function mdp(dispatch){
  return {
    signup: (newUserObj) => dispatch(signupUser(newUserObj)),
    login: (userObj) => dispatch(loginUser(userObj))
  }
}

export default connect(null, mdp)(App);
