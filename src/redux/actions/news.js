import http from '../../helpers/http';
import qs from 'qs';

const getNews = (data) => ({
  type: 'GET_NEWS',
  payload: http().get('news/', qs.stringify(data)),
});

export {getNews};
