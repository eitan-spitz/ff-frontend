import React from 'react';
import { NavLink } from 'react-router-dom';

class GameCard extends React.Component {

    render() {

        const game = this.props.gameObject

        return (
            <div className="game-card">
                    <h3>Name of the Game: {game.name} Challenge</h3>
                    <h4>Description: {game.description}</h4>
                    {console.log(game)}
               <NavLink to={ `/games/${game.name}` } className="link"> <button>Play Me!</button> </NavLink>
            </div> 
        )
    }


}

export default GameCard