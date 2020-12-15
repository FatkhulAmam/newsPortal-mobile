import http from '../../helpers/http';
import qs from 'qs';

const getCategory = (data) => ({
  type: 'GET_CATEGORY',
  payload: http().get('category', qs.stringify(data)),
});

const getCategoryById = (data, id) => ({
  type: 'GET_CATEGORY',
  payload: http().get(`category/${id}`, qs.stringify(data)),
});

export {getCategory, getCategoryById};
