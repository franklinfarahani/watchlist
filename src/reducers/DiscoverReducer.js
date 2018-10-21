import { 
  DISCOVER_INIT,
  DISCOVER_SUCCESS,
  DISCOVER_FAIL
} from '../actions/types';

const initialState = {
  results: [],
  page: 1,
  pageSize: 16,
  totalPages: null,
  totalResults: null,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISCOVER_INIT:
      return { ...state, isLoading: true }
    case DISCOVER_SUCCESS:
      const { items, page, page_size, total_pages, total_results } = action.payload;
      return {
        ...state,
        results: items,
        page: page,
        pageSize: page_size,
        totalPages: total_pages,
        totalResults: total_results,
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