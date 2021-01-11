import { GET_HOME_PRODUCTS } from '../actions/types.js'

const initialState = {
    products: []
}

export default function( state = initialState, action ) {
    switch(action.type){
        case GET_HOME_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                buy_sucess: false
            }
        default:
            return state
    }
}