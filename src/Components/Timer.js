import React from 'react'

class Timer extends React.Component {

    state = {
        timer: this.props.timer
    }

    render() {
        const timer = this.state.timer
        return (
            <>
            Time Left: {timer} seconds
           </>
        )
    }

    componentDidMount(){
        if(this.state.timer >= 1){ 
            this.myInterval = setInterval(() => {
                this.setState({
                    timer: this.state.timer - 1
                })
            }, 1000)
        }
    }

}

export default Timer