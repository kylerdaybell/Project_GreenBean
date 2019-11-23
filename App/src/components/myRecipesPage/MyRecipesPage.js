import React from "react";
import PageTitle from "../shared/PageTitle"
import { NavLink } from "react-router-dom";

const MyRecipePage = props => {
  return (
    <>
      <PageTitle title="My Recipes" />
      <div
        id="content-area"
        className="w3-container w3-row w3-center w3-display-center formFit"
      >
        <NavLink to="/myRecipes/addRecipe">
            Add Recipe
        </NavLink>
      </div>
    </>
  );
};

export default MyRecipePage;
