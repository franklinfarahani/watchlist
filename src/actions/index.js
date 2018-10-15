import { authRef, provider } from '../firebase';
import { 
  API,
  SEARCH_INIT,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  DISCOVER_INIT,
  DISCOVER_SUCCESS,
  DISCOVER_FAIL,
  CLEAR_RESULTS,
  FETCH_LIST,
  AUTH_USER,
  AUTH_ERROR,
  SIGN_OUT_USER,
  REQUEST_INIT,
  REQUEST_SUCCESS,
  REQUEST_FAIL
} from '../actions/types';

const baseURL = process.env.REACT_APP_BASE_URL;
// let nextPosition = 0;

// Action creator generator helper function
const makeActionCreator = (type, ...argNames) => {
  return function(...args){
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export const searchTitles = (query) => ({
  type: API,
  payload: {
    url: `${baseURL}/api/search?query=${query}`,
    init: label => searchInit(label),
    success: results => searchSuccess(results.items),
    fail: label => searchFail(label),
    label: 'search'
  }
});

export const clearResults = () => {
  return {
    type: CLEAR_RESULTS
  }
}

export const discoverTitles = (mediaType, genres, providers, page) => ({
  type: API,
  payload: {
    url: `${baseURL}/api/search?` + 
      `media_type=["${mediaType}"]` +
      `&genre=${JSON.stringify(genres)}` +
      `&provider=${JSON.stringify(providers)}` +
      `&page=${page}` +
      `&page_size=16`,
    init: label => discoverInit(label),
    success: results => discoverSuccess(results.items),
    fail: label => discoverFail(label),
    label: 'discover'
  }
});

export const fetchList = () => ({
  type: API,
  payload: {
    url: `${baseURL}/api/list`,
    authed: true,
    init: label => requestInit(label),
    success: (list) => setList(list),
    fail: label => requestFail(label),
    label: 'watchlist'
  }
});

export const addToList = (newItem) => ({
  type: API,
  payload: {
    url: `${baseURL}/api/list`,
    method: 'POST',
    authed: true,
    body: newItem,
    init: label => requestInit(label),
    success: (label) => requestSuccess(label),
    fail: label => requestFail(label),
    label: 'add'
  }
});

export const removeFromList = (removeItem) => ({
  type: API,
  payload: {
    url: `${baseURL}/api/list`,
    method: 'DELETE',
    authed: true,
    body: removeItem,
    init: label => requestInit(label),
    success: (label) => requestSuccess(label),
    fail: label => requestFail(label),
    label: 'remove'
  }
});

export const verifyAuth = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch(authUser(user));
    } else {
      dispatch(signOut());
    }
  });
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(response => {
      dispatch(authUser(response.user));
    })
    .catch(error => {
        dispatch(authError(error));
    });
};

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() =>{
      dispatch({
          type: SIGN_OUT_USER
      })
    });
};

export const searchInit = makeActionCreator(SEARCH_INIT, 'payload');
export const searchSuccess = makeActionCreator(SEARCH_SUCCESS, 'payload');
export const searchFail = makeActionCreator(SEARCH_FAIL, 'payload');
export const discoverInit = makeActionCreator(DISCOVER_INIT, 'payload');
export const discoverSuccess = makeActionCreator(DISCOVER_SUCCESS, 'payload');
export const discoverFail = makeActionCreator(DISCOVER_FAIL, 'payload');
export const requestInit = makeActionCreator(REQUEST_INIT, 'payload');
export const requestSuccess = makeActionCreator(REQUEST_SUCCESS, 'payload');
export const requestFail = makeActionCreator(REQUEST_FAIL, 'payload');
export const setList = makeActionCreator(FETCH_LIST, 'payload');
export const authUser = makeActionCreator(AUTH_USER, 'payload');
export const authError = makeActionCreator(AUTH_ERROR, 'payload');