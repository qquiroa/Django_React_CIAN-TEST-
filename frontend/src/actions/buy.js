import axios from 'axios'

import { GET_BUY_PRODUCT, BUY_SUCCESS, SHOW_ALERT } from './types'

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
            dispatch({ 
                type: SHOW_ALERT,
                payload: {
                    type: "ERROR",
                    message: err.response.data.detail,
                    code: err.response.status
                }
            })
        })
}

export const buyProduct = data => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.post(`/api/buy/`, data, config)
        .then(res => {
            dispatch({
                type: BUY_SUCCESS,
                payload: res.data
            })
            dispatch({ 
                type: SHOW_ALERT,
                payload: {
                    type: "SUCCESS",
                    message: 'Compra realizada correctamente.',
                }
            })
        })
        .catch(err => {
            dispatch({ 
                type: SHOW_ALERT,
                payload: {
                    type: "ERROR",
                    message: err.response.data.detail,
                    code: err.response.status
                }
            })
        })
}