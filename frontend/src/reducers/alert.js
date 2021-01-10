import { SHOW_ALERT } from '../actions/types.js'

const initialState = {
    alert: {
        type: '',
        message: '',
        code: null
    }
}

export default function( state = initialState, action ) {
    switch(action.type){
        case SHOW_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        default:
            return state
    }
}