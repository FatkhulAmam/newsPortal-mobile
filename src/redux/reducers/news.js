const initialState = {
  data: [],
  detailNews: [],
  isLoading: false,
  isError: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'There is an error at request data',
      };
    }
    case 'GET_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.result,
      };
    }
    //make news
    case 'MAKE_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'MAKE_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'make news denied',
      };
    }
    case 'MAKE_NEWS_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLogin: true,
        isLoading: false,
        message: 'make news success',
      };
    }
    // get detail news
    case 'GET_DETAIL_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_DETAIL_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'There is an error at request data',
      };
    }
    case 'GET_DETAIL_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        detailNews: action.payload.data.results,
      };
    }
    default: {
      return state;
    }
  }
};
