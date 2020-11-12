import http from '../../helpers/http'
import qs from 'qs'

const getDetail = (id) => ({
    type: 'GET_DETAIL',
    payload: http().get(`/news/${id}`)
})

export {getDetail}
