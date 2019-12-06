import * as initial from "./initialState";
import * as ActionTypes from "./constants";

export const greenBeanAPIReducer = (state, action) => {
  state = state || initial.greenBeanAPI;
  
  if ((action.type === ActionTypes.SEARCH_RECIPE_SUCCESS)) {
    return { ...state, recipes: action.recipes };
  }else if((action.type === ActionTypes.LOGIN_SUCCESS)){
    return { ...state, credentials: {email: action.email,password: action.password,loggedIn: action.loggedIn, userId: action.userId}}
  }else if(action.type === ActionTypes.LOGOUT){
    return { ...state, credentials: {email: "",password: "",loggedIn: false, userId: null}}
  }else if(action.type === ActionTypes.GET_TOP_TEN_SUCCESS){
    return{...state, homePageRecipes: action.recipes}
  }else if(action.type === ActionTypes.CHANGE_MODE){
    return { ...initial.greenBeanAPI, offlineMode: action.offlineMode}
  }else if(action.type === ActionTypes.DELETE_RECIPE_SUCCESS){
    let filteredRecipes = state.recipes.filter(r=>r.recipe.id !== action.recipeId)
    let filteredHomeRecipes = state.homePageRecipes.filter(r=>r.recipe.id !== action.recipeId)
    return { ...state, recipes: filteredRecipes, homePageRecipes: filteredHomeRecipes}
  }

  return state;
};

export const statusReducer = (state, action) => {
  state = state || initial.status;
  
  if ((action.type === ActionTypes.LOGIN_SUCCESS)){
    return {...state, loginSuccess: true}
  }else if (action.type === ActionTypes.LOGIN_FAILURE){
    return {...state, loginSuccess: false}
  }else if (action.type === ActionTypes.CREATE_NEW_RECIPE_SUCCESS){
    return {...state, createRecipeSuccess: true}
  }else if (action.type === ActionTypes.CREATE_NEW_RECIPE_FAILURE){
    return {...state, createRecipeSuccess: false}
  }
  return state;
}