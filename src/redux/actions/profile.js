import http from '../../helpers/http'
import qs from 'qs'

const getProfile = (token) => ({
    type: 'GET_USER',
    payload: http(token).get('user/')
})

export {getProfile}
