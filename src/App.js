import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameContainer from './Containers/GameContainer';


class App extends React.Component {

  componentDidMount(){
    fetch("http://localhost:3000/users")
      .then(r => r.json())
      .then(users => console.log(users))
  }

  render(){
    return (
      <div className="App">
        <Switch>
          <Route path='/home' render={() => <h1>Welcome!</h1>} />
          <Route path='/game' component={GameContainer} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
