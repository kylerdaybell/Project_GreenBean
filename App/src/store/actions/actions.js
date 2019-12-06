import * as OnlineActions from "./onlineActions";
import * as OfflineActions from "./offlineActions";
import * as ActionTypes from "../constants";
import * as ResultActions from "./resultActions";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";
import OfflineAPI from "../../Services/OfflineAPI";

function getService(getState) {
  return getState().greenBeanAPI.offlineMode ? OfflineAPI : GreenBeanAPIService;
}

export function ChangeMode(currentMode) {
  return {
    type: ActionTypes.CHANGE_MODE,
    offlineMode: !currentMode
  }
}

export function GetTopRecipes() {
  return function(dispatch, getState) {
    let service = getService(getState);
    return service.GetTopRecipes().then(recipes =>
      dispatch(ResultActions.GetTopTenRecipesSuccess(recipes))
    );
  };
}

export function DeleteRecipe(recipeId) {
  return function(dispatch, getState) {
    let deleteRequest = {id: recipeId, email: getState().greenBeanAPI.credentials.email, password: getState().greenBeanAPI.credentials.password}
    let service = getService(getState);
    return service.DeleteRecipe(deleteRequest).then(result => {
      result.includes("Result: Success")
        ? dispatch(ResultActions.DeleteRecipeSuccess(deleteRequest.id))
        : dispatch(ResultActions.DeleteRecipeFailure());
      return result.includes("Result: Success");
    })
    .catch(error => {
      dispatch(ResultActions.DeleteRecipeFailure());
      return false;
    });
  };
}

export function SearchForRecipeByIngredient(ingredients) {
  return function(dispatch, getState) {
    let service = getService(getState);
    return service.SearchForRecipeByIngredient(ingredients).then(
      recipes => {
        recipes.sort(
          (recipe1, recipe2) => recipe2.percentmatch - recipe1.percentmatch
        );
        dispatch(ResultActions.SearchByIngredientSuccess(recipes));
      }
    );
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
