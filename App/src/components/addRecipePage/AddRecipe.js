import React from "react";
import PageTitle from "../shared/PageTitle";
import AddRecipeForm from "./AddRecipeForm";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

const AddRecipe = props => {
  if (props.credentials.loggedIn === false && props.offlineMode === false) {
    return <Redirect to="/login"/>;
  }
  
  return (
    <>
      <PageTitle title={"Add a New Recipe"}/>
      <AddRecipeForm/>
    </>
  );
};

const mapStateToProps = state => {
  return {
      credentials: state.credentials,
      offlineMode: state.greenBeanAPI.offlineMode
  }
}

export default connect(mapStateToProps, null)(AddRecipe);