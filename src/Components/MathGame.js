import React from 'react'
import MathForm from './MathFrom'

class MathGame extends React.Component {

    state = {
        solution: null,
        solutionValue: "",
        gameStart: false,
        formula: null,
        response: null
    }
 
    simpleOperators = ["+", "-" ]
    complexOperators = ["*", "+", "-", "/"]

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    lvl1 = () => {
       let firstNum = this.getRndInteger(1, 10)
       let secondNum = this.getRndInteger(1, 10)
       let operator = this.simpleOperators[Math.floor(Math.random() * this.simpleOperators.length)]

       this.getSolution(firstNum, secondNum, operator)
       this.setState({gameStart: !this.state.gameStart , formula:`${firstNum} ${operator} ${secondNum}`, response: null})
    //    console.log(`${firstNum} ${operator} ${secondNum}`)
    }

    getSolution = (x, y, operator) => {
        switch(operator){
            case "+":
                let addition = x + y
                this.setState({solution: addition})
                break
            case "-":
                let subtraction = x - y
                this.setState({solution: subtraction})
                break
            default:
                break
        }
    }

    changeHandler = (e) => {
       this.setState({solutionValue: e.target.value}) 
    }

    

    submitHandler = (e) => {
        e.preventDefault()
        console.log("solution: ", this.state.solution, "submited answer: ", this.state.solutionValue)
        let answer = this.state.solution
        let submittedAnswer = parseInt(this.state.solutionValue)

        if(answer === submittedAnswer){
            this.setState({gameStart: !this.state.gameStart, formula: null , solutionValue: "", response: "correct"})
            console.log("You Got it Right!")
        } else {
            this.setState({solutionValue: "", response: "incorrect"})
            console.log("You Got it Wrong")
        }
    }

    answerResponse = () => {
        if(this.state.response === "correct"){
            return <h4>You Got it!</h4>
        } else if (this.state.response === "incorrect") {
            return <h4>You Dumbass! Hahaha, Try Again!</h4>
        } else {
            return 
        }
    }

    render (){
        return (
        <>
        <h2>Math Game!</h2>
        <h3> {this.state.gameStart ? this.state.formula : null} </h3>
        {!this.state.gameStart ? <button onClick={this.lvl1}>Start</button> : <MathForm solutionValue={this.state.solutionValue} submitHandler={this.submitHandler} changeHandler={this.changeHandler}/>}
        {this.answerResponse()}
        </>
        )
    }
}


export default MathGame