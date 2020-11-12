const initialState = {
    isLogin: false,
    isError: false,
    message: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MAKE_NEWS_PENDING':{
            return{
                ...state,
                isLoading: true
            }
        }
        case 'MAKE_NEWS_REJECTED':{
            return{
                ...state,
                isLoading: false,
                isError: true,
                message: 'make news denied'
            }
        }
        case 'MAKE_NEWS_FULFILLED':{
            return{
                ...state,
                isError: false,
                isLogin: true,
                isLoading:false,
                message: 'make news success'
            }
        }
        default:{
            return state
        }
    }
}