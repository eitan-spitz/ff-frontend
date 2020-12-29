import { INCREMENT_POINTS, DECREMENT_POINTS} from './actionTypes'

export function incrementPoints(){
    return {type: INCREMENT_POINTS}
}

export function decrementPoints(){
    return {type: DECREMENT_POINTS}
}