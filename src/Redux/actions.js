import { INCREMENT_POINTS, DECREMENT_POINTS, SIGNUP, LOGIN, RETURNING, SET_POINTS, DELETE_USER, EDIT_USER, LOGGING_OUT } from './actionTypes'
import {URL} from '../index'

export function incrementPoints(userId, userGame) {
    return function (dispatch, getState) {
        let userGameId = localStorage.getItem("userGameId")
        userGame.score += 1
        fetch(`${URL}/users/${userId}/user_games/${userGameId}`, {
            method: "PATCH",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({userGame: userGame})
        })
        .then(r=>r.json())
        .then(updatedUserGame => {
            dispatch({type: INCREMENT_POINTS, payload: updatedUserGame.score})
        })
    }
}

export function decrementPoints(userId, userGame) {
    return function (dispatch, getState) {
        let userGameId = localStorage.getItem("userGameId")
        userGame.score -= 1
        fetch(`${URL}/users/${userId}/user_games/${userGameId}`, {
            method: "PATCH",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({userGame: userGame})
        })
        .then(r=>r.json())
        .then(updatedUserGame => {
            dispatch({type: DECREMENT_POINTS, payload: updatedUserGame.score})
        })
    }
}

export function setPoints(userId, gameId) {
    return function (dispatch, getState) {
        fetch(`${URL}/users/${userId}/user_games`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(r=>r.json())
        .then(userGames => {
            // when adding another game, need to add a filter to get the correct points for the game (using the game id)
            console.log("returned: ", userGames, "userid: ", userId, "gameid: ", gameId)
            localStorage.setItem("userGameId", userGames.id)
            dispatch({type: SET_POINTS, payload: userGames})
        })
    }
}

export function signupUser(userObj) {
    return function (dispatch, getState) {
        fetch(`${URL}/users`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(newUserObj => {
                localStorage.setItem("token", newUserObj.jwt)
                dispatch({type: SIGNUP, payload: newUserObj.user})
            })
            .catch(console.log)
    }
}

export function loginUser(userObj) {
    return function(dispatch, getState){
        fetch(`${URL}/login`, {
            method: "POST",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user: userObj })
        })
            .then(r => r.json())
            .then(checkedUserObj => {
                localStorage.setItem("token", checkedUserObj.jwt)
                dispatch({type: LOGIN, payload: checkedUserObj.user})
            })
            .catch(console.log)
    }
}

export function returningUser(userObj) {
    return {type: RETURNING, payload: userObj}
}

export function deleteUser(userId){
    return function (dispatch){
        fetch(`${URL}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(r=>r.json())
        .then(response => {
            console.log(response)
            localStorage.clear()
            dispatch({type: DELETE_USER})
        })
    }
}

export function editUser(userObj, userId){
    return function (dispatch){
        fetch(`${URL}/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({ user: userObj })
        })
        .then(r=>r.json())
        .then(returnedUser => {
            console.log(returnedUser)
            dispatch({type: EDIT_USER, payload: returnedUser.user})
        })
    }
}

export function loggingOut(){
    return { type: LOGGING_OUT}
}