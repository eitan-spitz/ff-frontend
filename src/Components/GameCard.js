import React from 'react';
import { NavLink } from 'react-router-dom';

class GameCard extends React.Component {

    render() {

        const game = this.props.gameObject

        return (
            <div className="game-card">
                    <h2>Name of the game: {game.name}</h2>
                    <p>Description: We don't have descriptions for each game, but if we make them this is where they would go. </p>
               <NavLink to={ `/games/${game.name}` } className="link"> <button>Play Me!</button> </NavLink>
            </div> 
        )
    }


}

export default GameCard