import { GET_DASHBOARD } from '../actions/types.js'

const initialState = {
    perProduct: null,
    globalProduct: null,
    avgPrice: null
}

export default function( state = initialState, action ) {
    switch(action.type){
        case GET_DASHBOARD:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}