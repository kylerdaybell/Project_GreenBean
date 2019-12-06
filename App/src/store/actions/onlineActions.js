import * as ActionTypes from "../constants";
import * as ResultActions from "./resultActions";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";

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
