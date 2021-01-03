import { INCREMENT_POINTS, DECREMENT_POINTS, SIGNUP, LOGIN, RETURNING, SET_POINTS } from './actionTypes'

export function incrementPoints() {
    return { type: INCREMENT_POINTS }
}

export function decrementPoints() {
    return { type: DECREMENT_POINTS }
}

export function setPoints(userId, gameId) {
    return function (dispatch, getState) {
        fetch(`http://localhost:3000/users/${userId}/user_games`, {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("token")
            }
        })
        .then(r=>r.json())
        .then(userGames => {
            console.log("returned: ", userGames, "userid: ", userId, "gameid: ", gameId)
            dispatch({type: SET_POINTS, payload: userGames.score})
        })
    }
}

export function signupUser(userObj) {
    return function (dispatch, getState) {
        fetch('http://localhost:3000/users', {
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
        fetch('http://localhost:3000/login', {
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