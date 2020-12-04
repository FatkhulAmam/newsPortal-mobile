import http from '../../helpers/http';

const getProfile = (token) => ({
  type: 'GET_USER',
  payload: http(token).get('user/'),
});

export {getProfile};
