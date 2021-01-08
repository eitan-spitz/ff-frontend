import React from 'react'

class Timer extends React.Component {

    /** Time alotted is so we can keep track of how much time we are supposed to have. You can use this to set limits on how much time exists
     * Timer is basically Time Left, if you wanted to add seconds this is where it would be
     * Class changes depending on how much time is left. If you look at the CSS you'll see how it gets changed 
     * DashArray is what we need to keep track of the circle as it goes down
     */

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
                const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(0)} 283`    //CircleDash Array is used to determine where the ring should be at

                this.colorCodes(currentTime)    //with currentTime we figure out what color the ring should be
                this.setState({timer: currentTime, dashArray: circleDasharray})     //the set state is now updating the timer every second and the ring around the timer
                if(currentTime === 0){
                    this.endofRound()   //here we reference endofRound 
                }       
            }, 1000)
        }
           
        /**sets the clock to zero and callsback atZero from MathGame */
      endofRound = () => {
        clearInterval(this.myInterval)
        this.props.atZero()
      }

      
    render() {
        const time = this.state.timer
        const dashArray = this.state.dashArray
        
        return (
            /**All of the classNames are for the CSS code || cx, cy, r all the sive of the circle
            d is the shape of the circle */

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
                    {this.formatTimeLeft(time)} {/** Here we are just printing the time*/}
                </span>

                
            </div>
           
        )
    }


}

export default Timer