const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    message: ''
}
  
export default (state=initialState, action)=>{
    switch(action.type){
      case 'GET_NEWS_PENDING' : {
        return {
          ...state,
          isLoading: true
        }
      }
      case 'GET_NEWS_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: 'There is an error at request data'
        }
      }
      case 'GET_NEWS_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          data: action.payload.data.data
        }
      }
      default : {
        return state
      }
    }
  }