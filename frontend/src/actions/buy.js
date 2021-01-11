import axios from 'axios'

import { GET_BUY_PRODUCT } from './types'

export const getProduct = id => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get(`/api/products/${id}`, config)
        .then(res => {
            dispatch({
                type: GET_BUY_PRODUCT,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}