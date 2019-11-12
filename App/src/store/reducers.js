import * as initial from "./initialState";
import * as ActionTypes from "./constants";

export const greenBeanAPIReducer = (state, action) => {
  state = state || initial.greenBeanAPI;

  if ((action.type === ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS)) {
    return { ...state, recipes: action.recipes };
  }else if((action.type === ActionTypes.LOGIN_SUCCESS)){
    return { ...state, credentials: {email: action.email,password: action.password,loggedIn: action.loggedIn}}
  }

  return state;
};
