import React from 'react';
import { Link } from 'react-router-dom';

class GameCard extends React.Component {


    clickHandler = () => {
        this.props.clickHandler(this.props.gameObject)
    }

    render() {

        const game = this.props.gameObject

        return (
            <Link to={`games/${game.name}`} onClick={this.clickHandler} className="link">
                <div className="game-card">
                    <h2>Name of the game: {game.name}</h2>
                    <p>Description: We don't have descriptions for each game, but if we make them this is where they would go. </p>
                </div> 
           </Link>
        )
    }


}

export default GameCard