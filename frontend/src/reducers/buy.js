import { GET_BUY_PRODUCT, BUY_SUCCESS } from '../actions/types.js'

const initialState = {
    product: {},
    buy_sucess: false
}

export default function( state = initialState, action ) {
    switch(action.type){
        case GET_BUY_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case BUY_SUCCESS:
            return {
                ...state,
                buy_sucess: true
            }
        default:
            return state
    }
}