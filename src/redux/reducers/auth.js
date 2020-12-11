const initialState = {
  isLogin: false,
  isError: false,
  isLoadingLogin: false,
  isLoadingRegister: false,
  isLoadingChange: false,
  token: '',
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    //login reducers
    case 'AUTH_USER_PENDING': {
      return {
        ...state,
        isLoadingLogin: true,
        message: 'loged in...',
      };
    }
    case 'AUTH_USER_REJECTED': {
      return {
        ...state,
        isLoadingLogin: false,
        isError: true,
        message: 'access denied',
      };
    }
    case 'AUTH_USER_FULFILLED': {
      return {
        ...state,
        isLogin: true,
        isLoadingLogin: false,
        message: 'login successfully',
        token: action.payload.data.token,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isLogin: false,
        token: '',
      };
    }
    //register reducers
    case 'MAKE_ACCOUNT_PENDING': {
      return {
        ...state,
        isLoadingRegister: true,
      };
    }
    case 'MAKE_ACCOUNT_REJECTED': {
      return {
        ...state,
        isLoadingRegister: false,
        isError: true,
        message: 'register denied',
      };
    }
    case 'MAKE_ACCOUNT_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoadingRegister: false,
        message: 'register success',
      };
    }
    //cahange password
    case 'CHANGE_PASSWORD_PENDING': {
      return {
        ...state,
        isLoadingChange: true,
      };
    }
    case 'CHANGE_PASSWORD_REJECTED': {
      return {
        ...state,
        isLoadingChange: false,
        isError: true,
        message: 'cannot change password',
      };
    }
    case 'CHANGE_PASSWORD_FULFILLED': {
      return {
        ...state,
        isError: false,
        isLoadingChange: false,
        message: 'change password success',
      };
    }
    default: {
      return state;
    }
  }
};
