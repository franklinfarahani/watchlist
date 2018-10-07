import { authFetch } from '../firebase';
import { API } from '../actions/types';
import { fail } from '../actions';

const api = ({ dispatch }) => next => async action => {

  if (action.type !== API) {
    return next(action);
  }

  const { url, method, body, authed, success, label } = action.payload;
  
  try {
    const response = authed ?
      await authFetch(url, method, body) :
      await fetch(url);
    const list = await response.json();    
    dispatch(success(list))
  }
  catch(error) {
    console.error(error);
    dispatch(fail(label))
  }
};

export default api;