import { SHOW_ALERT } from './types'

export const alert = (type, message, code=null) => dispatch => {
    dispatch({
        type: SHOW_ALERT,
        payload: {
            type,
            message,
            code
        }
    })
}