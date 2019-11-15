import React from "react";
import PageTitle from "../shared/PageTitle";
import AddRecipeForm from "./AddRecipeForm";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";

const AddRecipe = props => {
  if (props.credentials.loggedIn === false) {
    return <Redirect to="/login"/>;
  }
  
  return (
    <>
      <PageTitle title={"Add a New Recipe"}/>
      <AddRecipeForm />
    </>
  );
};

const mapStateToProps = state => {
  return {
      credentials: state.greenBeanAPI.credentials
  }
}

export default connect(mapStateToProps, null)(AddRecipe);