import http from '../../helpers/http';
import qs from 'qs';

const loginAction = (data) => ({
  type: 'AUTH_USER',
  payload: http().post('auth/login', qs.stringify(data)),
});

const registerAction = (data) => ({
  type: 'MAKE_ACCOUNT',
  payload: http().post('auth/register/', qs.stringify(data)),
});

const changePassword = (data) => ({
  type: 'CHANGE_PASSWORD',
  payload: http().patch('auth/password/change', qs.stringify(data)),
});

export {loginAction, registerAction, changePassword};
