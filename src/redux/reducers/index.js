import {combineReducers} from 'redux'

import auth from './auth'
import register from './register'
import news from './news'
import profile from './profile'

export default combineReducers({
    auth,
    register,
    news,
    profile
})