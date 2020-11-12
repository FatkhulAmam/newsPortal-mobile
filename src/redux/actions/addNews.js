import http from '../../helpers/http'
import qs from 'qs'

const makeNewsAction = (data, token) => ({
    type: 'MAKE_NEWS',
    payload: http(token).post('/news', qs.stringify(data))
})

export {makeNewsAction}