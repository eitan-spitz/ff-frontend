import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import MathGame from '../Components/MathGame';

class GameContainer extends React.Component {

    state = {
        apiRespone: [],
        timer: null
    }

    /** 1. Immplenting Auth - Eitan
     * 
     * 1. Routing Finished
     * 2. Tracking Points
     * 3. UserGames model
     * 4. Finish Full CRUD
     */

    componentDidMount() {
        fetch("http://localhost:3000/games")
        .then(r => r.json())
        .then(arrayofGames => this.setState({apiRespone: arrayofGames}))
        .catch(console.log)
    }

    pickaGame = (gameObj) => {
        this.setState({timer: gameObj.time_to_complete_round})
    }

    arrayofGames = () => {
        return this.state.apiRespone.map(gameEl =>  <GameCard key={gameEl.id} gameObject={gameEl} clickHandler={this.pickaGame}/>)
    }


    render (){
        return (
        <>
        <h1> Game Container</h1>
        <Switch>

            <Route path='/games/math' render={ () => {
                return(
                    <>
                    <MathGame timer={this.state.timer}/>
                    </>
                )}
            }/>

            <Route path="/games" render={ () => {
                return (
                    <>
                    {this.arrayofGames()}
                    </>
                )}
            } />

        </Switch>
        </>
        )
    }
}


export default GameContainer