import { GET_IMDB_ID, GET_TITLE } from '../actions/types';

const initialState = {
  id: '',
  item: {},
  isLoading: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_IMDB_ID:
      return {
        ...state,
        id: action.payload,
        isLoading: false
      };
    case GET_TITLE:
      action.payload.then((data) => {
        console.log(data);
        // const filteredResults = data.results.filter(item => item.media_type !== "person");
        return {
          ...state,
          item: data,
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
    default:
      return state;
  }
};