import axios from 'axios'
import { login } from './auth'

import { GET_OWN_PRODUCTS, GET_OWN_PRODUCT, UPDATE_OWN_PRODUCT, CREATE_OWN_PRODUCT, SHOW_ALERT } from './types'

export const getOwnProducts = () => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get('/api/auth/own-product', config)
        .then(res => {
            dispatch({
                type: GET_OWN_PRODUCTS,
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

export const getOwnProduct = (id) => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get(`/api/auth/own-product/${id}`, config)
        .then(res => {
            dispatch({
                type: GET_OWN_PRODUCT,
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

export const updateOwnProduct = (product) => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    product.id_category = product.category
    delete product.category
    axios.put(`/api/auth/own-product/${product.id}/`, product, config)
        .then(res => {
            dispatch({
                type: UPDATE_OWN_PRODUCT,
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

export const createOwnProduct = (product) => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    const data = new FormData
    data.append("name", product.name)
    data.append("description", product.description)
    data.append("price", product.price)
    data.append("stock", product.stock)
    data.append("id_category", product.id_category)
    data.append("image", product.image)

    axios.post(`/api/auth/own-product/`, data, config)
        .then(res => {
            dispatch({
                type: CREATE_OWN_PRODUCT,
            })
            dispatch({
                type: SHOW_ALERT,
                payload: {
                    type: "SUCCESS",
                    message: 'Creado correctamente.',
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

