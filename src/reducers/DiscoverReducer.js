import { 
  DISCOVER_INIT,
  DISCOVER_SUCCESS,
  DISCOVER_FAIL
} from '../actions/types';

const initialState = {
  results: [],
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_INIT:
      return { ...state, isLoading: true }
    case DISCOVER_SUCCESS:
      return {
        ...state,
        results: action.payload,
        isLoading: false
      };
    case DISCOVER_FAIL:
    return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};