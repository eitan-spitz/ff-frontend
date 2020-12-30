import {combineReducers} from 'redux'

const defaultState = {
    user: null,
    points: 0
}

function userReducer(prevState = defaultState.user, action){
    switch (action.type) {
        case "SIGNUP":
            console.log(action.payload)
            return action.payload
        default:
            return prevState
    }
}


function pointsReducer(prevState = defaultState.points, action){
    switch (action.type) {
        case "INCREMENT_POINTS":
            return ++prevState
        case "DECREMENT_POINTS":
            return --prevState
        default:
            return prevState
    }
}


const rootReducer = combineReducers({
   user: userReducer,
   points: pointsReducer
})

export default rootReducer 