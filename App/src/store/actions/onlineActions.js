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
    ).then(recipes =>
      dispatch(ResultActions.SearchByIngredientSuccess(recipes))
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
      result.includes("Result: Success")
        ? dispatch(ResultActions.LoginSuccess(email, password))
        : dispatch(ResultActions.LoginFailure());
    });
  };
}

export function Logout() {
  return {
    type: ActionTypes.LOGOUT,
    email: "",
    password: "",
    loggedIn: false
  };
}

export function Register(email, password, validate) {
  return function(dispatch) {
    return GreenBeanAPIService.Register(email, password, validate).then(
      result => {
        result === "Result: Success"
          ? dispatch(ResultActions.RegisterSuccess())
          : dispatch(ResultActions.RegisterFailure());
      }
    );
  };
}

export function CreateNewRecipeOnline(recipe) {
  return function(dispatch) {
    return GreenBeanAPIService.CreateNewRecipe(recipe)
      .then(result => {
        result === "Result: Success"
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

