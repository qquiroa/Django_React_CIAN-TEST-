import { combineReducers } from 'redux'
import categories from './categories'
import user from './user'
import auth from './auth'
import alert from './alert'
import product from './product'
import home from './home'
import buy from './buy'

export default combineReducers({
    categories,
    auth,
    user,
    alert,
    product,
    home,
    buy
})