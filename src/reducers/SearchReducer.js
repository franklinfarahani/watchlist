import { 
  SEARCH_INIT,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  CLEAR_RESULTS
} from '../actions/types';

const initialState = {
  results: [],
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        isLoading: false
      };
    case SEARCH_INIT:
      return { ...state, isLoading: true }
    case SEARCH_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false
      };
    case SEARCH_FAIL:
    return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};