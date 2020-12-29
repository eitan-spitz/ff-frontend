import React from 'react'
import { connect } from 'react-redux'
import MathForm from './MathForm'
import { incrementPoints, decrementPoints } from '../Redux/actions'

class MathGame extends React.Component {

    state = {
        solution: null,
        solutionValue: "",
        gameStart: false,
        formula: null,
        response: null
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
        this.setState({ gameStart: !this.state.gameStart, formula: `${firstNum} ${operator} ${secondNum}`, response: null, solution: this.tempSolution })
    }

    lvl2 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 100)
        let operator = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.simpleSolution(firstNum, secondNum, operator)
        this.setState({ gameStart: !this.state.gameStart, formula: `${firstNum} ${operator} ${secondNum}`, response: null, solution: this.tempSolution })
    }

    lvl3 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 100)
        let thirdNum = this.getRndInteger(1, 100)
        let operator1 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({ gameStart: !this.state.gameStart, formula: `${firstNum} ${operator1} ${secondNum} ${operator2} ${thirdNum}`, response: null, solution: this.tempSolution })
    }

    lvl4 = () => {
        let firstNum = this.getRndInteger(1, 100)
        let secondNum = this.getRndInteger(1, 10)
        let thirdNum = this.getRndInteger(1, 100)
        let operator1 = this.complexOperators[Math.floor(Math.random() * this.complexOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({ gameStart: !this.state.gameStart, formula: `(${firstNum} ${operator1} ${secondNum}) ${operator2} ${thirdNum}`, response: null, solution: this.tempSolution })
    }

    lvl5 = () => {
        let firstNum = this.getRndInteger(1, 1000)
        let secondNum = this.getRndInteger(1, 100)
        let thirdNum = this.getRndInteger(1, 10000)
        let operator1 = this.complexOperators[Math.floor(Math.random() * this.complexOperators.length)]
        let operator2 = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

        this.complexSolution(firstNum, secondNum, thirdNum, operator1, operator2)
        this.setState({ gameStart: !this.state.gameStart, formula: `(${firstNum} ${operator1} ${secondNum}) ${operator2} ${thirdNum}`, response: null, solution: this.tempSolution })
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


    getLevel = () => {
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


    changeHandler = (e) => {
        this.setState({ solutionValue: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log("solution: ", this.state.solution, "submited answer: ", this.state.solutionValue)
        let answer = this.state.solution
        let submittedAnswer = parseInt(this.state.solutionValue)

        if (answer === submittedAnswer) {
            this.props.increasePoints()
            console.log("You Got it Right!")
            this.setState({ gameStart: !this.state.gameStart, formula: null, solutionValue: "", response: "correct" })
        } else {
            this.props.decreasePoints()
            console.log("You Got it Wrong")
            this.setState({ solutionValue: "", response: "incorrect" })
        }
    }

    answerResponse = () => {
        if (this.state.response === "correct") {
            return <h4>You Got it!</h4>
        } else if (this.state.response === "incorrect") {
            return <h4>You Dumbass! Hahaha, Try Again!</h4>
        } else {
            return
        }
    }

    render() {
        return (
            <>
                <h2>Math Game!</h2>
                <h3>total points: {this.props.points}</h3>
                <h3> {this.state.gameStart ? this.state.formula : null} </h3>
                {!this.state.gameStart ? <button onClick={this.getLevel}>Start</button> : <MathForm solutionValue={this.state.solutionValue} submitHandler={this.submitHandler} changeHandler={this.changeHandler} />}
                {this.answerResponse()}
            </>
        )
    }
}

function msp(state) {
    return { points: state.points }
}

function mdp(dispatch) {
    return {
        increasePoints: () => dispatch(incrementPoints()),
        decreasePoints: () => dispatch(decrementPoints())
    }
}


export default connect(msp, mdp)(MathGame)