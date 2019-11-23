import * as ActionTypes from "./constants";
import GreenBeanAPIService from "../Services/GreenBeanAPIService";

export function GetTopTenRecipes(ingredients) {
  return function(dispatch) {
    return GreenBeanAPIService.GetTopTenRecipes(ingredients).then(
      recipes => dispatch(GetTopTenRecipesSuccess(recipes))
    );
  };
}

export function GetTopTenRecipesSuccess(recipes) {
  return { type: ActionTypes.GET_TOP_TEN_SUCCESS, recipes };
}


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

export function Register(email,password,validate){
  return function(dispatch){
    return GreenBeanAPIService.Register(email,password,validate).then(
      result=> {result === "Result: Success" ? dispatch(RegisterSuccess()) : dispatch(RegisterFailure())}
    )
  }
}

export function RegisterSuccess(){
  return {
    type: ActionTypes.REGISTER_SUCCESS
  }
}

export function RegisterFailure(){
  return {
    type: ActionTypes.REGISTER_FAILURE
  }
}

export function CreateNewRecipe(recipe){
  return function(dispatch){
    return GreenBeanAPIService.CreateNewRecipe(recipe).then(
      result=> {result === "Result: Success" ? dispatch(CreateNewRecipeSuccess()) : dispatch(CreateNewRecipeFailure())}
    ).catch(dispatch(CreateNewRecipeFailure()));
  };
};

export function CreateNewRecipeSuccess() {
  return {
    type: ActionTypes.CREATE_NEW_RECIPE_SUCCESS
  }
}

export function CreateNewRecipeFailure(){
  return {
    type: ActionTypes.CREATE_NEW_RECIPE_FAILURE
  }
}

export function AdvancedSearch(ingredients, category, email){
  return function(dispatch){
    return GreenBeanAPIService.AdvancedSearch(ingredients, category, email).then(
      recipes=>{
        if(typeof category !== 'undefined'){
          recipes = recipes.filter(r=>r.recipe.category === category)
        }
        dispatch(AdvancedSearchSuccess(recipes))
      }
    )
  }
}

export function AdvancedSearchSuccess(recipes){
  return {
    type: ActionTypes.ADVANCED_SEARCH_SUCCESS,
    recipes
  }
}