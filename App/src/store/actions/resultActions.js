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

export function LoginSuccess(email, password, userId) {
  let loggedIn = true;
  return { type: ActionTypes.LOGIN_SUCCESS, email, password, userId, loggedIn };
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
  return { type: ActionTypes.SEARCH_RECIPE_SUCCESS, recipes };
}

export function SearchByCategorySuccess(recipes) {
  return { type: ActionTypes.SEARCH_RECIPE_SUCCESS, recipes };
}

export function SearchByNameSuccess(recipes) {
  return { type: ActionTypes.SEARCH_RECIPE_SUCCESS, recipes };
}

export function AdvancedSearchSuccess(recipes) {
  return {
    type: ActionTypes.ADVANCED_SEARCH_SUCCESS,
    recipes
  };
}

export function DeleteRecipeSuccess(recipeId) {
  return {
    type: ActionTypes.DELETE_RECIPE_SUCCESS,
    recipeId: recipeId
  };
}

export function DeleteRecipeFailure(){
  return { type: ActionTypes.DELETE_RECIPE_FAILURE };
}
