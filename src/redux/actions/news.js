import http from '../../helpers/http';
import qs from 'qs';

const getNews = (token, data) => ({
  type: 'GET_NEWS',
  payload: http(token).get('news/?sort[createdAt]=desc', qs.stringify(data)),
});

const makeNewsAction = (token, form) => ({
  type: 'MAKE_NEWS',
  payload: http(token).post('news', form),
});

const getDetail = (token, id) => ({
  type: 'GET_DETAIL',
  payload: http(token).get(`news/${id}`),
});

const getSearch = (keyword, data) => ({
  type: 'GET_SEARCH',
  payload: http().get(`news/?search[headline]=${keyword}`, qs.stringify(data)),
});

export {getNews, makeNewsAction, getDetail, getSearch};
