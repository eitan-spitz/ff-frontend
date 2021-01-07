import React from 'react'

class Timer extends React.Component {

    state = {
        timeAlotted: this.props.timer,
        timer: this.props.timer,
        dashArray: 283,
        class: "green" 
    }

    /** Changing the class the classList item depending on what the time is */
    colorCodes = (time) => {
        if(time <= 5){
            this.setState({class: "red"})
        } else if (time <= 10) {
            this.setState({class: "orange"})
        } else {
            this.setState({class:"green"})        
        }
    }

    /**this prints the time direct onto the timer */
    formatTimeLeft = (time) => {
        const minutes = Math.floor(time / 60)
        let seconds = time % 60
        if (seconds < 10) {
          seconds = `0${seconds}`
        }
        return `${minutes}:${seconds}`
      }
    
      /**Forumla to help with the corrdinates of the timer's circle */
    calculateTimeFraction = () => {
        const rawTimeFraction = this.state.timer / this.state.timeAlotted
        return rawTimeFraction - (1/this.state.timeAlotted) * (1 - rawTimeFraction)
      }
       
     /** Our official timer and Updates CircleDashArray(the circle with colors in it) */ 
    componentDidMount(){
        this.myInterval = setInterval(() => {
                const currentTime = this.state.timer - 1
                const circleDasharray = `${(
                    this.calculateTimeFraction() * 283
                  ).toFixed(0)} 283`

                this.colorCodes(currentTime)
                this.setState({timer: currentTime, dashArray: circleDasharray})
                if(currentTime === 0){
                    this.endofRound()
                }       
            }, 1000)
        }
           

      endofRound = () => {
        clearInterval(this.myInterval)
        this.props.atZero()
      }

      
    render() {
        const time = this.state.timer
        const dashArray = this.state.dashArray
        
        return (
            <div className="base-timer">
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="basetimer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="45" r="45"/>
                        <path id="base-timer-path-remaining" stroke-dasharray={`${dashArray}`} className={`base-timer__path-remaining ${this.state.class}`}
                        d=" M 50, 50 
                        m -45, 0 
                        a 45,45 0 1,0 90,0 
                        a 45,45 0 1,0 -90,0
                        ">
                        </path>
                    </g>
                </svg>
                <span id="base-timer-label" className="base-timer__label">   
                    {this.formatTimeLeft(time)}
                </span>

                
            </div>
           
        )
    }


}

export default Timer