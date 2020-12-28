import React from 'react'

class MathForm extends React.Component {

    

    render() {
        return (
            <>
            <form onSubmit={this.props.submitHandler}>
                <input type="number" placeholder="solution" name="solution" value={this.props.solutionValue} onChange={this.props.changeHandler}/>
                <br/>
                <button>Submit Your Answer</button>
            </form>
            
            </>
        )
    }
}

export default MathForm