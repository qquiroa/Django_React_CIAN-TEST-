import axios from 'axios'

import { GET_HOME_PRODUCTS } from './types'

export const getProducts = () => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get('/api/products', config)
        .then(res => {
            dispatch({
                type: GET_HOME_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}