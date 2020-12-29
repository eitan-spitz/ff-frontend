import {combineReducers} from 'redux'

const defaultState = {
    users: [],
    points: 0
}

function usersReducer(prevState = defaultState.users, action){
    console.log("In usersReducer: ", prevState, action)
    return prevState
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
   users: usersReducer,
   points: pointsReducer
})

export default rootReducer 