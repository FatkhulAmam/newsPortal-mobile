import http from '../../helpers/http'
import qs from 'qs'

const getNews = (data) => ({
    type: 'GET_NEWS',
    payload: http().get('/news/?sort[createdAt]=desc', qs.stringify(data))
})

export {getNews}
