import axios from 'axios'

import { GET_DASHBOARD, SHOW_ALERT } from './types'

export const getDashboard = () => (dispatch, getState) => {

    const token = getState().auth.token,
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

    if (token) {
        config.headers['Authorization'] = 'Token ' + token
    }
    axios.get(`/api/dashboard`, config)
        .then(res => {
            dispatch({
                type: GET_DASHBOARD,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
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