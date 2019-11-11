import React from "react";
import PageTitle from "../shared/PageTitle";
import AddRecipeForm from "./AddRecipeForm";

const AddRecipe = () => {
  return (
    <>
      <PageTitle title={"Add a New Recipe"}/>
      <AddRecipeForm />
    </>
  );
};

export default AddRecipe;