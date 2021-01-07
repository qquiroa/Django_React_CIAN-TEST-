import axios from 'axios'

import { GET_LEADS } from './types'

export const getLeads = () => dispatch => {
    axios.get('/api/')
        .then(res => {
            dispatch({
                type: GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}