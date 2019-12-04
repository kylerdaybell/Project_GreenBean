import * as ActionTypes from "../constants";
import * as ResultActions from "./resultActions";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";

export function GetTopTenRecipesOnline() {
  return function(dispatch) {
    return GreenBeanAPIService.GetTopTenRecipes().then(recipes =>
      dispatch(ResultActions.GetTopTenRecipesSuccess(recipes))
    );
  };
}

export function SearchForRecipeByIngredientOnline(ingredients) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByIngredient(
      ingredients
    ).then(recipes => {
      recipes.sort((recipe1, recipe2) => (recipe2.percentmatch - recipe1.percentmatch));
      dispatch(ResultActions.SearchByIngredientSuccess(recipes))
    }
    );
  };
}

export function SearchForRecipeByNameOnline(name) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByName(name).then(recipes =>
      dispatch(ResultActions.SearchByNameSuccess(recipes))
    );
  };
}

export function SearchForRecipeByCategoryOnline(category) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByCategory(
      category
    ).then(recipes => dispatch(ResultActions.SearchByCategorySuccess(recipes)));
  };
}

export function Login(email, password) {
  return function(dispatch) {
    return GreenBeanAPIService.Login(email, password).then(result => {
      let parsedResult = JSON.parse(result)
      parsedResult.Result === "Success"
        ? dispatch(ResultActions.LoginSuccess(email, password, parsedResult.UserId))
        : dispatch(ResultActions.LoginFailure());
        return result;
    });
  };
}

export function Logout() {
  return {
    type: ActionTypes.LOGOUT
  };
}

export function Register(email, password, validate) {
  return function(dispatch) {
    return GreenBeanAPIService.Register(email, password, validate).then(
      result => {
        result.includes("Result: Success")
          ? dispatch(ResultActions.RegisterSuccess())
          : dispatch(ResultActions.RegisterFailure());
          return result;
      }
    );
  };
}

export function CreateNewRecipeOnline(recipe) {
  return function(dispatch) {
    return GreenBeanAPIService.CreateNewRecipe(recipe)
      .then(result => {
        result.includes("Result: Success")
          ? dispatch(ResultActions.CreateNewRecipeSuccess())
          : dispatch(ResultActions.CreateNewRecipeFailure());
      })
      .catch(dispatch(ResultActions.CreateNewRecipeFailure()));
  };
}

export function AdvancedSearchOnline(ingredients, category, email) {
  return function(dispatch) {
    return GreenBeanAPIService.AdvancedSearch(
      ingredients,
      category,
      email
    ).then(recipes => {
      if (typeof category !== "undefined") {
        recipes = recipes.filter(r => r.recipe.category === category);
      }
      dispatch(ResultActions.AdvancedSearchSuccess(recipes));
    });
  };
}

