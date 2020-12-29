import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MathGame from '../Components/MathGame';
import Timer from '../Components/Timer';

class GameContainer extends React.Component {

    state = {
        apiRespone: [],
        gameTerm: "",
        timer: 0
    }

    componentDidMount() {
        fetch("http://localhost:3000/games")
        .then(r => r.json())
        .then(arrayofGames => this.setState({apiRespone: arrayofGames}))
        .catch(console.log)
    }


    


    render (){
        return (
        <>
        <h1>Game Container</h1>
        <Timer timer={this.state.timer}/>
        </>
        )
    }
}


export default GameContainer