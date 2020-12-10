const initialState = {
  data: [],
  myNews: [],
  detailNews: [],
  isLoading: false,
  isError: false,
  isMaked: false,
  isUpdated: false,
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
    // get my news
    case 'MY_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'MY_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'There is an error at request data',
      };
    }
    case 'MY_NEWS_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        myNews: action.payload.data.results,
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
        isMaked: true,
        isLoading: false,
        message: 'make news success',
      };
    }
    //update news
    case 'UPDATE_NEWS_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_NEWS_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'update news denied',
      };
    }
    case 'UPDATE_NEWS_FULFILLED': {
      return {
        ...state,
        isError: false,
        isUpdated: true,
        isLoading: false,
        message: 'update news success',
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
