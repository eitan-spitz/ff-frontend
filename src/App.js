import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import GameContainer from './Containers/GameContainer';
import SignupForm from './Components/SignupForm';
import { signupUser } from './Redux/actions';


class App extends React.Component {

  componentDidMount(){
  }

  submitHandler = (userObj) => {
    this.props.signup(userObj)
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path='/home' render={() => <h1>Welcome!</h1>} />
          <Route path='/games' render={() => <GameContainer />} />
          <Route path='/signup' render={() => <SignupForm submitHandler={this.submitHandler} />} />
        </Switch>
        
      </div>
    );
  }
}

function mdp(dispatch){
  return {
    signup: (newUserObj) => dispatch(signupUser(newUserObj))
  }
}

export default connect(null, mdp)(App);
