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
  hasUpdated: false,
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
    case REMOVE_ITEM_REQUEST:
      return { ...state, isLoading: true, hasUpdated: false }
    case ADD_ITEM_SUCCESS:
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        hasUpdated: true,
        isLoading: false
      };
    case ADD_ITEM_FAIL:
    case REMOVE_ITEM_FAIL:
    return {
        ...state,
        hasUpdated: false,
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