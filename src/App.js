import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MathContainer from './Containers/MathContainer';


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
          <Route path='/math-game' component={MathContainer} />
        </Switch>
        
      </div>
    );
  }
}

export default App;
