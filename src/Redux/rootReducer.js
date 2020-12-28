import {combineReducers} from 'redux'

const defaultState = {
    users: [],
    level: 1
}

function usersReducer(prevState = defaultState.users, action){
    console.log("In usersReducer: ", prevState, action)
    return prevState
}

function levelReducer(prevState = defaultState.level, action){
   console.log("In levelReducer: ", prevState, action)
   return prevState
}


const rootReducer = combineReducers({
   users: usersReducer,
   level: levelReducer
})

export default rootReducer