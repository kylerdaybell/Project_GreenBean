import * as ActionTypes from "./constants";
import GreenBeanAPIService from "../Services/GreenBeanAPIService";

export function SearchByIngredientSuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}

export function SearchForRecipeByIngredient(ingredients) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByIngredient(ingredients).then(
      recipes => dispatch(SearchByIngredientSuccess(recipes))
    );
  };
}
