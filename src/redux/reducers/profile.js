const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isUpdated: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_USER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'There is an error at request data',
      };
    }
    case 'GET_USER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.results,
      };
    }
    //update news
    case 'UPDATE_PROFILE_PENDING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UPDATE_PROFILE_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: 'update profile denied',
      };
    }
    case 'UPDATE_PROFILE_FULFILLED': {
      return {
        ...state,
        isError: false,
        isUpdated: true,
        isLoading: false,
        message: 'update profile success',
      };
    }
    default: {
      return state;
    }
  }
};
