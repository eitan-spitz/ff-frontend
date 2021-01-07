import {combineReducers} from 'redux'

const defaultState = {
    user: null,
    points: 0,
    userGame: null
}

function userReducer(prevState = defaultState.user, action){
    switch (action.type) {
        case "SIGNUP":
            console.log(action.payload)
            return action.payload
        case "LOGIN":
            console.log(action.payload)
            return action.payload
        case "RETURNING":
            console.log(action.payload)
            return action.payload
        case "DELETE_USER":
            return null
        case "EDIT_USER":
            console.log(action.payload)
            return action.payload
        case "LOGGING_OUT":
            return null
        default:
            return prevState
    }
}


function pointsReducer(prevState = defaultState.points, action){
    switch (action.type) {
        case "INCREMENT_POINTS":
            return action.payload
        case "DECREMENT_POINTS":
            return action.payload
        case "SET_POINTS":
            console.log("in set points ",action.payload)
            return action.payload.score
        default:
            return prevState
    }
}

function userGameReducer(prevState = defaultState.points, action){
    switch (action.type) {
        case "SET_POINTS":
            console.log("in userGameReducer ",action.payload)
            return action.payload
        default:
            return prevState
    }
}


const rootReducer = combineReducers({
   user: userReducer,
   points: pointsReducer,
   userGame: userGameReducer
})

export default rootReducer 