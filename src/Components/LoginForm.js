import React from 'react'


class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
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
            <form onSubmit={this.submitHandler} className="form">

                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} />
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} />
                
                <button>Log In</button>
               
            </form>
        )
    }
}

export default LoginForm