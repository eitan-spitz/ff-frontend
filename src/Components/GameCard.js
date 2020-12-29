import React from 'react'

class GameCard extends React.Component {


    clickHandler = () => {
        this.props.clickHandler(this.props.gameObject)
    }

    render() {

        const game = this.props.gameObject

        return (
           <div className="game-card" onClick={this.clickHandler}>
               <h2>Name of the game: {game.name}</h2>
               <p>Description: We don't have descriptions for each game, but if we make them this is where they would go. </p>
           </div>
        )
    }


}

export default GameCard