import * as OnlineActions from "./onlineActions";
import * as OfflineActions from "./offlineActions";
import * as ActionTypes from "../constants";

export function ChangeMode(currentMode) {
  return {
    type: ActionTypes.CHANGE_MODE,
    offlineMode: !currentMode
  }
}

export function GetTopTenRecipes() {
  return function(dispatch, getState) {
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.GetTopTenRecipesOffline())
      : dispatch(OnlineActions.GetTopTenRecipesOnline());
  };
}

export function DeleteRecipe(recipeId) {
  return function(dispatch, getState) {
    let deleteRequest = {id: recipeId, email: getState().greenBeanAPI.credentials.email, password: getState().greenBeanAPI.credentials.password}
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.DeleteRecipe(recipeId))
      : dispatch(OnlineActions.DeleteRecipe(deleteRequest))
  }
}

export function SearchForRecipeByIngredient(ingredients) {
  return function(dispatch, getState) {
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.SearchForRecipeByIngredientOffline(ingredients))
      : dispatch(OnlineActions.SearchForRecipeByIngredientOnline(ingredients));
  };
}

export function SearchForRecipeByName(name) {
  return function(dispatch, getState) {
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.SearchForRecipeByNameOffline(name))
      : dispatch(OnlineActions.SearchForRecipeByNameOnline(name));
  };
}

export function SearchForRecipeByCategory(category) {
  return function(dispatch, getState) {
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.SearchForRecipeByCategoryOffline(category))
      : dispatch(OnlineActions.SearchForRecipeByCategoryOnline(category));
  };
}

export function CreateNewRecipe(recipe) {
  return function(dispatch, getState) {
    getState().greenBeanAPI.offlineMode
      ? dispatch(OfflineActions.CreateNewRecipeOffline(recipe))
      : dispatch(OnlineActions.CreateNewRecipeOnline(recipe));
  };
}
