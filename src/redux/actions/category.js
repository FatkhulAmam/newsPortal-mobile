import http from '../../helpers/http'
import qs from 'qs'

const getCategory = (data) => ({
    type: 'GET_CATEGORY',
    payload: http().get('category', qs.stringify(data))
})

export {getCategory}
