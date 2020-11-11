import http from '../../helpers/http'
import qs from 'qs'

const getProfile = (token, data) => ({
    type: 'GET_USER',
    payload: http(token).get('user/', qs.stringify(data))
})

export {getProfile}
