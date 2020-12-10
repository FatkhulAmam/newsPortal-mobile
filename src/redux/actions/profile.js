import http from '../../helpers/http';

const getProfile = (token) => ({
  type: 'GET_USER',
  payload: http(token).get('user/'),
});

const updateProfile = (token, form) => ({
  type: 'UPDATE_PROFILE',
  payload: http(token).patch('user/', form),
});

export {getProfile, updateProfile};
