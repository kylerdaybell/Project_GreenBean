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

export function SearchForRecipeByName(name) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByName(name).then(
      recipes => dispatch(SearchByNameSuccess(recipes))
    );
  };
}

export function SearchByNameSuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}

export function SearchForRecipeHeader(name) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByName(name).then(
      recipesHead => dispatch(SearchForRecipeHeaderSuccess(recipesHead))
    );
  };
}

export function SearchForRecipeHeaderSuccess(recipesHead) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_HEADER_SUCCESS, recipesHead };
}
export function SearchForRecipeByCategory(category){
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByCategory(category).then(
      recipes => dispatch(SearchByCategorySuccess(recipes))
    );
  };
}
export function SearchByCategorySuccess(recipes) {
  return { type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS, recipes };
}

export function LoginSuccess(email,password){
  let loggedIn = true;
  return {type: ActionTypes.LOGIN_SUCCESS,email,password, loggedIn}
}

export function LoginFailure(){
  return{type: ActionTypes.LOGIN_FAILURE}
}

export function Login(email,password){
  return function(dispatch){
    return GreenBeanAPIService.Login(email,password).then(
      result=> {result === "Result: Success" ? dispatch(LoginSuccess(email,password)) : dispatch(LoginFailure())}
    )
  }
}

export function Logout(){
  return{
    type: ActionTypes.LOGOUT,
    email: "",
    password: "",
    loggedIn: false
  }
}

export function CreateNewRecipe(recipe){
  return function(dispatch){
    return GreenBeanAPIService.CreateNewRecipe(recipe);
  };
};
