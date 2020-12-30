import { INCREMENT_POINTS, DECREMENT_POINTS, SIGNUP, LOGIN } from './actionTypes'

export function incrementPoints() {
    return { type: INCREMENT_POINTS }
}

export function decrementPoints() {
    return { type: DECREMENT_POINTS }
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
            .then(newUserObj => dispatch({type: SIGNUP, payload: newUserObj}))
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
            .then(checkedUserObj => dispatch({type: LOGIN, payload: checkedUserObj}))
            .catch(console.log)
    }
}