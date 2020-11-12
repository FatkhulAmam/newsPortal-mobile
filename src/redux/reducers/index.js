import {combineReducers} from 'redux'

import auth from './auth'
import register from './register'
import news from './news'
import profile from './profile'
import addNews from './addNews'
import category from './category'
import search from './search'

export default combineReducers({
    auth,
    register,
    news,
    profile,
    addNews,
    category,
    search
})