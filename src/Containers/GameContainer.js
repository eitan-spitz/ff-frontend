import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GameCard from '../Components/GameCard'
import MathGame from '../Components/MathGame'

class GameContainer extends React.Component {

    state = {
        apiRespone: [],
        timer: null
    }

    /** 1. Immplenting Auth - Eitan
     * 
     * 1. Putting Timer into global state(Redux) -Demetrio
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
                {this.props.user ? 
                
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
                : 
                    <Redirect to="/home" />
                }
            </>
        )
    }
}

function msp(state) {
    return {user: state.user}
}


export default connect(msp, null)(GameContainer)