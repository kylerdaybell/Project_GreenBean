import React from "react";
import { NavLink } from "react-router-dom";

const RecipeCard = props => {
  return (
    <NavLink to={`/recipes/${props.recipe.recipe.id}`}>
      <div className="w3-card w3-third w3-white recipeCard">
        <img
          src={props.recipe.recipe.picture}
          alt="recipe"
          style={{ width: "100%", height: "30vh" }}
        ></img>
        <h2 className="w3-container">{props.recipe.recipe.name}</h2>
        <p className="w3-text-green w3-container ">
          {Math.floor((props.recipe.percentmatch * 10) / 10)}% match
        </p>
        <p className="w3-container ">Description: {props.recipe.recipe.descr}</p>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
