import { combineReducers } from 'redux'
import categories from './categories'
import user from './user'
import auth from './auth'

export default combineReducers({
    categories,
    auth,
    user
})