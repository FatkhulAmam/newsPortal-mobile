import {combineReducers} from 'redux';

import auth from './auth';
import news from './news';
import profile from './profile';
import category from './category';
import search from './search';

export default combineReducers({
  auth,
  news,
  profile,
  category,
  search,
});
