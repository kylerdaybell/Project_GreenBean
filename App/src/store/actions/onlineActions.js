import * as ActionTypes from "../constants";
import * as ResultActions from "./resultActions";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";

export function GetTopTenRecipes() {
  return function(dispatch) {
    return GreenBeanAPIService.GetTopTenRecipes().then(recipes =>
      dispatch(ResultActions.GetTopTenRecipesSuccess(recipes))
    );
  };
}

export function SearchForRecipeByIngredient(ingredients) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByIngredient(
      ingredients
    ).then(recipes =>
      dispatch(ResultActions.SearchByIngredientSuccess(recipes))
    );
  };
}

export function SearchForRecipeByName(name) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByName(name).then(recipes =>
      dispatch(ResultActions.SearchByNameSuccess(recipes))
    );
  };
}

export function SearchForRecipeByCategory(category) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByCategory(
      category
    ).then(recipes => dispatch(ResultActions.SearchByCategorySuccess(recipes)));
  };
}

export function Login(email, password) {
  return function(dispatch) {
    return GreenBeanAPIService.Login(email, password).then(result => {
      result === "Result: Success"
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

export function CreateNewRecipe(recipe) {
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

export function AdvancedSearch(ingredients, category, email) {
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

