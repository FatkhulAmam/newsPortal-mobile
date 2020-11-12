const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    message: ''
}
  
export default (state=initialState, action)=>{
    switch(action.type){
      case 'GET_DETAIL_PENDING' : {
        return {
          ...state,
          isLoading: true
        }
      }
      case 'GET_DETAIL_REJECTED': {
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: 'There is an error at request data'
        }
      }
      case 'GET_DETAIL_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload.data.result
        }
      }
      default : {
        return state
      }
    }
  }