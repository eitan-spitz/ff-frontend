import React from 'react'
import { connect } from 'react-redux'

class EditForm extends React.Component {
    state = {
        username: this.props.user.username,
        email: this.props.user.email
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        
        let location = this.props.routerProps.history
        location.replace("/home")
        this.props.submitHandler(this.state)
    }

    render(){
        return(
            <form onSubmit={this.submitHandler} >
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.changeHandler} />
                <button>Edit User</button>
            </form>
        )
    }
}

function msp(state){
    return{
        user: state.user
    }
}

export default connect(msp, null) (EditForm)