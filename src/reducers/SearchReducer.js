import { 
  SEARCH_TITLES_REQUEST,
  SEARCH_TITLES_SUCCESS,
  SEARCH_TITLES_FAIL,
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
    case SEARCH_TITLES_REQUEST:
      return { ...state, isLoading: true }
    case SEARCH_TITLES_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false
      };
    case SEARCH_TITLES_FAIL:
    return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};