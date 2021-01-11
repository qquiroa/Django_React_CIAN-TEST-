import axios from 'axios'

import { GET_CATEGORIES } from './types'

export const getCategories = () => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get('/api/categories', config)
        .then(res => {
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}