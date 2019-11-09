import * as ActionTypes from "./constants";
import GreenBeanAPIService from "../Services/GreenBeanAPIService";

export const actionCreators = {
  SearchByIngredientSuccess: recipes => ({
    type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS,
    recipes
  }),
  SearchForRecipeByIngredient: function(ingredients) {
    return function(dispatch) {
      return GreenBeanAPIService.SearchForRecipeByIngredient(ingredients).then(
        recipes => dispatch(SearchByIngredientSuccess(recipes))
      );
    };
  }
};
