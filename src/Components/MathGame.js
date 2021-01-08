import React from 'react'
import { connect } from 'react-redux'
import MathForm from './MathForm'
import { incrementPoints, decrementPoints, setPoints } from '../Redux/actions'
import Timer from './Timer'
import Points from '../Containers/PointsContainer'

class MathGame extends React.Component {

    state = {
        solution: null,
        solutionValue: "",
        gameStart: false,
        formula: null,
        response: null,
        gameEnd: "no"
    }

    componentDidMount(){
        this.props.settingPoints(this.props.user.id, this.props.gameId)
    }

    simpleOperators = ["+", "-"]
    complexOperators = ["*", "+", "-"]
    tempSolution = null

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }


    lvl1 = () => {
        let firstNum = this.getRndInteger(1, 10)
        let secondNum = this.getRndInteger(1, 10)
        let operator = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.simpleSolution(firstNum, secondNum, operator)
        this.setState({ formula: `${firstNum} ${operator} ${secondNum}`, solution: this.tempSolution })
    }

    lvl2 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 100)
        let operator = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.simpleSolution(firstNum, secondNum, operator)
        this.setState({  formula: `${firstNum} ${operator} ${secondNum}`, solution: this.tempSolution })
    }

    lvl3 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 100)
        let thirdNum = this.getRndInteger(1, 100)
        let operator1 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({  formula: `${firstNum} ${operator1} ${secondNum} ${operator2} ${thirdNum}`, solution: this.tempSolution })
    }

    lvl4 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 10)
        let thirdNum = this.getRndInteger(1, 100)
        let operator1 = this.complexOperators[Math.floor(Math.random() * this.complexOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({ formula: `(${firstNum} ${operator1} ${secondNum}) ${operator2} ${thirdNum}`, solution: this.tempSolution })
    }

    lvl5 = () => {
        let firstNum = this.getRndInteger(1, 1000)
        let secondNum = this.getRndInteger(1, 100)
        let thirdNum = this.getRndInteger(1, 10000)
        let operator1 = this.complexOperators[Math.floor(Math.random() * this.complexOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({formula: `(${firstNum} ${operator1} ${secondNum}) ${operator2} ${thirdNum}`, solution: this.tempSolution })
    }

    complexSolution = (x, y, z, operator1, operator2) => {
        this.simpleSolution(x, y, operator1)
        let xy = this.tempSolution
        this.simpleSolution(xy, z, operator2)
    }

    simpleSolution = (x, y, operator) => {
        switch (operator) {
            case "+":
                let addition = x + y
                this.tempSolution = addition
                break
            case "-":
                let subtraction = x - y
                this.tempSolution = subtraction
                break
            case "*":
                let multiplication = x * y
                this.tempSolution = multiplication
                break
            case "/":
                let division = x / y
                this.tempSolution = division
                break
            default:
                break
        }
    }

    /** Restart resets the game's states so that we end up back on the starting of the game after we are done */
    restartGame = () => {
        this.setState({gameEnd: "no", response: null})
        this.getLevel()
    }

    /** the first if statement asks if gameEnd is at "no" if it is then it goes ahead and looks for the level asscoiated. If we started at zero in terms of points then this would have to be changed */
    getLevel = () => {
        if(this.state.gameEnd === "no"){
            this.setState({gameStart: true})
            if (this.props.points < 5) {
                this.lvl1()
            } else if (this.props.points < 10) {
                this.lvl2()
            } else if (this.props.points < 15) {
                this.lvl3()
            } else if (this.props.points < 20) {
                this.lvl4()
            } else if (this.props.points < 25) {
                this.lvl5()
        }
       }    
    }

    changeHandler = (e) => {
        this.setState({ solutionValue: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        let answer = this.state.solution
        let submittedAnswer = parseInt(this.state.solutionValue)

        /**Since we can't setState and do a function I created the helper function correctAnswer for when you get it right */
        if (answer === submittedAnswer) {
            this.props.increasePoints(this.props.user.id, this.props.userGame)
            this.correctAnswer()
        } else {
            this.props.decreasePoints(this.props.user.id, this.props.userGame)
            this.setState({ solutionValue: "", response: "incorrect" })
        }
    }

    /** Sets State so that the level keeps on going */
    correctAnswer = () => {
        this.setState({formula: null, solutionValue: "", response: "correct" })
        this.getLevel()
    }

    /** Had to create a way to have a random response from an array Used this and when called it will give a random statement */
    randomResponse = (array) => {
        let shuffled = array.slice(0), i = array.length, temp, index;
        while (i--) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(0, 1)
    }

    /**In order to not have a boring repeat answer here we can get a random response of 3, if you want to add in more responses I'm more than happy to have it */
    answerResponse = () => {
        const correctResponses = ["You Got It!", "Good Job!", "Woah look at you go!"]
        const incorrectResponses = ["Ooof", "You Sure You Know What You're Doing?", "I think Frued would be sad"]

        if (this.state.response === "correct") {
            return <h4>{this.randomResponse(correctResponses)}</h4>
        } else if (this.state.response === "incorrect") {
            return <h4>{this.randomResponse(incorrectResponses)}</h4>
        } else {
            return
        }
    }

    /**atZero just happens when the timer lands at zero, we pass this through props for the timer */
    atZero = () => {
        this.setState({gameEnd: "yes", gameStart: false})
    }

    render() {
        return (
            <div className="game-start">

                { this.state.gameEnd === "yes"
                    ?
                    <>
                    <h3>End of the Round</h3>
                    <p>Your Total Points Are: {this.props.points}</p>
                    <button onClick={this.restartGame}>Play again?</button>
                    </>
                    :
                    <div className="game-play">
                        {this.state.gameStart ? <h3>{this.state.formula} </h3>: <h2>Ready to Play the Math Game?</h2>}

                        {!this.state.gameStart 
                        ? <button onClick={this.getLevel}>Start</button> 
                        : 
                        <> 
                        <MathForm solutionValue={this.state.solutionValue} submitHandler={this.submitHandler} changeHandler={this.changeHandler} />
                        <Timer timer={this.props.timer} atZero={this.atZero}/>
                        <Points points={this.props.points}/>
                        <h4>Total Points: {this.props.points}</h4>
                        </>
                        }
                    </div>
                }

                <h2 className="ans-response">{this.answerResponse()}</h2>
            </div>
        )
    }
}

function msp(state) {
    return { 
        points: state.points, 
        user: state.user, 
        userGame: state.userGame
    }
}

function mdp(dispatch) {
    return {
        increasePoints: (userId, userGame) => dispatch(incrementPoints(userId, userGame)),
        decreasePoints: (userId, userGame) => dispatch(decrementPoints(userId, userGame)),
        settingPoints: (userId, gameId) => dispatch(setPoints(userId, gameId))
    }
}


export default connect(msp, mdp)(MathGame)