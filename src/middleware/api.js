import { authFetch } from '../firebase';
import { API } from '../actions/types';

const api = ({ dispatch }) => next => async action => {

  if (action.type !== API) {
    return next(action);
  }

  const { url, method, body, authed, init, success, fail, label } = action.payload;
  dispatch(init(label))
  try {
    const response = authed ?
      await authFetch(url, method, body) :
      await fetch(url);
    const contentType = response.headers.get("content-type");
    const data = contentType && contentType.indexOf("application/json") !== -1 ? 
      await response.json() :
      await response.text();    
    dispatch(success(data))
  }
  catch(error) {
    console.error(error);
    dispatch(fail(label))
  }
};

export default api;