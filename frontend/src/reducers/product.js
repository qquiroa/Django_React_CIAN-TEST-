import { GET_OWN_PRODUCT, GET_OWN_PRODUCTS, UPDATE_OWN_PRODUCT, CREATE_OWN_PRODUCT } from '../actions/types.js'

const initialState = {
    product: [],
    editing_product: null,
    updated: false,
    created: false,
}

export default function( state = initialState, action ) {
    switch(action.type){
        case GET_OWN_PRODUCTS:
            return {
                ...state,
                product: action.payload.products,
                updated: false,
                created: false
            }
        case GET_OWN_PRODUCT:
            return {
                ...state,
                editing_product: action.payload
            }
        case UPDATE_OWN_PRODUCT:
            return {
                ...state,
                updated: true
            }
        case CREATE_OWN_PRODUCT:
            return {
                ...state,
                created: true
            }
        default:
            return state
    }
}