import http from '../../helpers/http'
import qs from 'qs'

const registerAction = (data) => ({
    type: 'MAKE_ACCOUNT',
    payload: http().post('auth/register/', qs.stringify(data))
})

export {registerAction}