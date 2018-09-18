import { SEARCH_TITLES, FETCH_LIST } from '../actions/types';

const initialState = {
  results: [],
  list: [],
  isLoading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_TITLES:
      action.payload.then((data) => {
        const filteredResults = data.results.filter(item => item.media_type !== "person");
        return {
          ...state,
          results: filteredResults,
          isLoading: false
        };
      })
      .catch(error => (
        {
          ...state,
          isLoading: false,
          error
        }
      ));
      break;
    case FETCH_LIST:
      let arr = [];
      if (action.payload){
        arr = Object.keys(action.payload).map((i) => action.payload[i]);
      }
      return {
        ...state,
        list: arr,
        isLoading: false
      }
    default:
      return state;
  }
};