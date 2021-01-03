import React from 'react';
import { NavLink } from 'react-router-dom';

class GameCard extends React.Component {

    render() {

        const game = this.props.gameObject

        return (
            <div className={`${game.name}`}>
                <NavLink to={ `/games/${game.id}` } className="link">
                    <h2>Name of the game: {game.name}</h2>
                    <p>Description: We don't have descriptions for each game, but if we make them this is where they would go. </p>
                </NavLink>
            </div> 
        )
    }


}

export default GameCard