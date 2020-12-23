import './App.css';
import React from 'react'

class App extends React.Component {

  componentDidMount(){
    fetch("http://localhost:3000/users")
      .then(r => r.json())
      .then(users => console.log(users))
  }

  render(){
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
