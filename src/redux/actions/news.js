import http from '../../helpers/http';
import qs from 'qs';

const getNews = (token, sortKey, sortValue) => ({
  type: 'GET_NEWS',
  payload: http(token).get(`news/?sort[${sortKey}]=${sortValue}`),
});

const getNewsScroll = (token, page) => ({
  type: 'NEWS_PAGE',
  payload: http(token).get(`news/?sort[createdAt]=desc&page=${page}`),
});

const getNewsMyNews = (token) => ({
  type: 'MY_NEWS',
  payload: http(token).get('news/all/user'),
});

const makeNewsAction = (token, form) => ({
  type: 'MAKE_NEWS',
  payload: http(token).post('news', form),
});

const updateNewsAction = (token, id, form) => ({
  type: 'UPDATE_NEWS',
  payload: http(token).patch(`news/${id}`, form),
});

const getDetail = (token, id) => ({
  type: 'GET_DETAIL',
  payload: http(token).get(`news/${id}`),
});

const getSearch = (token, keyword) => ({
  type: 'GET_SEARCH',
  payload: http(token).get(`news?search[headline]=${keyword}`),
});

export {
  getNews,
  makeNewsAction,
  getDetail,
  getSearch,
  getNewsMyNews,
  updateNewsAction,
  getNewsScroll,
};
