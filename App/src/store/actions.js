import * as ActionTypes from "./constants";
import GreenBeanAPIService from "../Services/GreenBeanAPIService";
import { func } from "prop-types";

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

export function CreateNewRecipe(recipe){
  return function(dispatch){
    return GreenBeanAPIService.CreateNewRecipe(recipe);
  };
};
