import {combineReducers} from 'redux'

import auth from './auth'
import register from './register'
import news from './news'

export default combineReducers({
    auth,
    register,
    news
})