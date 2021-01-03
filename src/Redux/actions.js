import { INCREMENT_POINTS, DECREMENT_POINTS, SIGNUP, LOGIN, RETURNING, SET_POINTS } from './actionTypes'

export function incrementPoints(userId, userGame) {
    return function (dispatch, getState) {
        let userGameId = localStorage.getItem("userGameId")
        userGame.score += 1
        fetch(`http://localhost:3000/users/${userId}/user_games/${userGameId}`, {
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
        fetch(`http://localhost:3000/users/${userId}/user_games/${userGameId}`, {
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
        fetch(`http://localhost:3000/users/${userId}/user_games`, {
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