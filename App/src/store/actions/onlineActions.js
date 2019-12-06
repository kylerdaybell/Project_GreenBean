import * as ActionTypes from "../constants";
import * as ResultActions from "./resultActions";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";


export function SearchForRecipeByIngredientOnline(ingredients) {
  return function(dispatch) {
    return GreenBeanAPIService.SearchForRecipeByIngredient(ingredients).then(
      recipes => {
        recipes.sort(
          (recipe1, recipe2) => recipe2.percentmatch - recipe1.percentmatch
        );
        dispatch(ResultActions.SearchByIngredientSuccess(recipes));
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
    return GreenBeanAPIService.Login(email, password)
      .then(result => {
        result.Result === "Success"
          ? dispatch(ResultActions.LoginSuccess(email, password, result.UserId))
          : dispatch(ResultActions.LoginFailure());
        return result.Result === "Success";
      })
      .catch(error => {
        dispatch(ResultActions.LoginFailure());
        return false;
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
    return GreenBeanAPIService.Register(email, password, validate)
      .then(result => {
        result.includes("Result: Success")
          ? dispatch(ResultActions.RegisterSuccess())
          : dispatch(ResultActions.RegisterFailure());
        return result.includes("Result: Success");
      })
      .catch(error => {
        dispatch(ResultActions.RegisterFailure());
        return false;
      });
  };
}

export function CreateNewRecipeOnline(recipe) {
  return function(dispatch) {
    return GreenBeanAPIService.CreateNewRecipe(recipe)
      .then(result => {
        result.includes("Result: Success")
          ? dispatch(ResultActions.CreateNewRecipeSuccess())
          : dispatch(ResultActions.CreateNewRecipeFailure());
        return result.includes("Result: Success");
      })
      .catch(error => {
        dispatch(ResultActions.CreateNewRecipeFailure());
        return false;
      });
  };
}

export function DeleteRecipe(deleteRequest) {
  return function(dispatch) {
    return GreenBeanAPIService.DeleteRecipe(deleteRequest).then(result => {
      result.includes("Result: Success")
        ? dispatch(ResultActions.DeleteRecipeSuccess(deleteRequest.id))
        : dispatch(ResultActions.DeleteRecipeFailure());
      return result.includes("Result: Success");
    })
    .catch(error => {
      dispatch(ResultActions.DeleteRecipeFailure());
      return false;
    });
  };
}
