import axios from 'axios'

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types'

export const login = (username, password) => (dispatch, getState) => {

    axios.post('/api/auth/login', {
        username,
        password
    })
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: LOGIN_FAIL })
        })
}

export const register = (username, email, password) => (dispatch, getState) => {

    axios.post('/api/auth/register', {
        username,
        email,
        password
    })
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: REGISTER_FAIL })
        })
}

export const logout = () => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }

    axios.post('/api/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: LOGOUT_FAIL })
        })
}

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }

    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: AUTH_ERROR })
        })
}

export const newUser = (username, email, password) => dispatch => {
    axios.post('/api/auth/register', {
        username,
        email,
        password
    }).then(res => {
        dispatch({
            type: NEW_USER,
            payload: res.data
        })
    })
        .catch(err => {
            console.log(err)
        })
} 