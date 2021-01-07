import React from 'react'
import { connect } from 'react-redux'
import { deleteUser } from '../Redux/actions'

const Profile = (props) => {
    const deleteHandler = () => {
        let location = props.routerProps.history
        location.replace("/home")
        props.deletingUser(props.user.id)
    }

    const editHandler = () => {
        let location = props.routerProps.history
        location.replace("/edit")
    }

    return(
        <span className="profile">
            <h1>Profile</h1>
            <h3>Username: {props.user.username}</h3>
            <h4>Email: {props.user.email}</h4>
            <button onClick={editHandler} >Edit User</button>
            <button onClick={deleteHandler} >Delete User</button>
        </span>
    )
}

function msp(state){
    return { 
        user: state.user
    }
}

function mdp(dispatch){
    return {
        deletingUser: (userId) => {dispatch(deleteUser(userId))}
    }
}

export default connect(msp, mdp)(Profile)