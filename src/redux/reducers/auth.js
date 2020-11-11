const initialState = {
    isLogin: false,
    isError: false,
    token: '',
    message: '',
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_USER_PENDING':{
            return{
                ...state,
                isLoading: true,
                message: 'loged in...'
            }
        }
        case 'AUTH_USER_REJECTED':{
            return{
                ...state,
                isLoading: false,
                isError: true,
                message: 'access denied'
            }
        }
        case 'AUTH_USER_FULFILLED':{
            return{
                ...state,
                isLogin: true,
                isLoading:false,
                message: 'login successfully',
                token: action.payload.data.token
            }
        }
        case 'LOGOUT': {
            return{
                ...state,
                isLogin: false,
                token: ''
            }
        }
        default:{
            return state
        }
    }
}