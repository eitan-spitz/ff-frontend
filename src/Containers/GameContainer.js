import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import GameCard from '../Components/GameCard'
import MathGame from '../Components/MathGame'

class GameContainer extends React.Component {

    state = {
        apiRespone: [],
        timer: null,
        gameId: null
    }

    /** 
     * 
     * 1. Finish Routing
     * 2. Finish Full CRUD
     * 3. CSS
     */

    componentDidMount() {
        if(this.props.user){
            fetch("http://localhost:3000/games", {
                method: "GET",
                headers: {
                    "Accepts": "application/json",
                    "Content-type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            })
            .then(r => r.json())
            .then(arrayofGames => this.setState({apiRespone: arrayofGames}))
            .catch(console.log)
        }
    }

    arrayofGames = () => {
        return this.state.apiRespone.map(gameEl =>  <GameCard key={gameEl.id} gameObject={gameEl} />)
    }




    render (){

        return (
            <>

                {this.props.user ? 
                
                <>
                    <h1> Game Container</h1>
                    <Switch>


                        <Route path='/games/:name' render={ (routerProps) => {
                            
                            const gameName = routerProps.match.params.name

                            const foundGame = this.state.apiRespone.find(gameEl => gameEl.name === gameName)

                            let gameCard

                            if(foundGame){
                                gameCard = <MathGame timer={foundGame.time_to_complete_round} gameId={foundGame.id}/>
                            } else {
                                gameCard = <h1>Loading</h1>
                            }

                           return gameCard
                        }}  />

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