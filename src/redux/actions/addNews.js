import http from '../../helpers/http'
import qs from 'qs'

const makeNewsAction = (data) => ({
    type: 'MAKE_NEWS',
    payload: http().post('news', qs.stringify(data))
})

export {makeNewsAction}