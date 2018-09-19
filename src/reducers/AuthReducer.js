import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from "../actions/types";

const initialState = {
  user: {},
  loading: true,
  authenticated: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
      case AUTH_USER:
          return {
              ...state,
              user: action.payload,
              loading: false,
              authenticated: true,
              error: null
          };
      case SIGN_OUT_USER:
          return {
              ...state,
              loading: false,
              authenticated: false,
              error: null
          };
      case AUTH_ERROR:
          return {
              ...state,
              loading: false,
              error: action.payload.message
          };
      default:
          return state;
  }
}