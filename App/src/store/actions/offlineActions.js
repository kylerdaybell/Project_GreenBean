import * as ResultActions from "./resultActions";
import OfflineAPI from "../../Services/OfflineAPI";

export function GetTopTenRecipesOffline() {
  return function(dispatch) {
    return OfflineAPI.GetTopTenRecipes().then(recipes =>
      dispatch(ResultActions.GetTopTenRecipesSuccess(recipes))
    );
  };
}

export function SearchForRecipeByIngredientOffline(ingredients) {
  return function(dispatch) {
    return OfflineAPI.SearchForRecipeByIngredient(ingredients).then(recipes =>
      dispatch(ResultActions.SearchByIngredientSuccess(recipes))
    );
  };
}

export function SearchForRecipeByNameOffline(name) {
  return function(dispatch) {
    return OfflineAPI.SearchForRecipeByName(name).then(recipes =>
      dispatch(ResultActions.SearchByNameSuccess(recipes))
    );
  };
}

export function SearchForRecipeByCategoryOffline(category) {
  return function(dispatch) {
    return OfflineAPI.SearchForRecipeByCategory(category).then(recipes =>
      dispatch(ResultActions.SearchByCategorySuccess(recipes))
    );
  };
}

export function CreateNewRecipeOffline(recipe) {
  return function(dispatch) {
    return OfflineAPI.CreateNewRecipe(recipe)
      .then(result => {
        result === "Result: Success"
          ? dispatch(ResultActions.CreateNewRecipeSuccess())
          : dispatch(ResultActions.CreateNewRecipeFailure());
      })
      .catch(dispatch(ResultActions.CreateNewRecipeFailure()));
  };
}
