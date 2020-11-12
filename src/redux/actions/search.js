import http from '../../helpers/http'
import qs from 'qs'

const getSearch = (keyword, data) => ({
    type: 'GET_SEARCH',
    payload: http().get(`/news/?search[headline]=${keyword}`, qs.stringify(data))
})

export {getSearch}
