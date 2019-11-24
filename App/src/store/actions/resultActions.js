import * as ActionTypes from "../constants";

export function RegisterSuccess() {
  return {
    type: ActionTypes.REGISTER_SUCCESS
  };
}

export function RegisterFailure() {
  return {
    type: ActionTypes.REGISTER_FAILURE
  };
}

export function LoginSuccess(email, password) {
  let loggedIn = true;
  return { type: ActionTypes.LOGIN_SUCCESS, email, password, loggedIn };
}

export function LoginFailure() {
  return { type: ActionTypes.LOGIN_FAILURE };
}

export function CreateNewRecipeSuccess() {
  return {
    type: ActionTypes.CREATE_NEW_RECIPE_SUCCESS
  };
}

export function CreateNewRecipeFailure() {
  return {
    type: ActionTypes.CREATE_NEW_RECIPE_FAILURE
  };
}

export function GetTopTenRecipesSuccess(recipes) {
  return { type: ActionTypes.GET_TOP_TEN_SUCCESS, recipes };
}

export function SearchByIngredientSuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}

export function SearchByCategorySuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}

export function SearchByNameSuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}