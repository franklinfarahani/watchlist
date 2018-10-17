import { 
  GET_TITLE_INIT,
  GET_TITLE_SUCCESS,
  GET_TITLE_FAIL
} from '../actions/types';

const initialState = {
  item: {},
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TITLE_INIT:
      return { ...state, isLoading: true }
    case GET_TITLE_SUCCESS:
      return {
        ...state,
        item: action.payload,
        isLoading: false
      };
    case GET_TITLE_FAIL:
    return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};