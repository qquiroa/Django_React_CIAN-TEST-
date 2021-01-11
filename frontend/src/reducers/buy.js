import { GET_BUY_PRODUCT } from '../actions/types.js'

const initialState = {
    product: {},
    receipt_info: {}
}

export default function( state = initialState, action ) {
    switch(action.type){
        case GET_BUY_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        default:
            return state
    }
}