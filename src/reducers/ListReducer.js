import { 
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  FETCH_LIST
} from '../actions/types';

const initialState = {
  list: [],
  isSuccessful: false,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
    case REMOVE_ITEM_REQUEST:
      return { ...state, isLoading: true }
    case ADD_ITEM_SUCCESS:
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        isLoading: false
      };
    case ADD_ITEM_FAIL:
    case REMOVE_ITEM_FAIL:
    return {
        ...state,
        isSuccessful: false,
        isLoading: false,
        error: action.error
      }
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