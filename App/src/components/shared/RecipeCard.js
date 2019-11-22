import React from "react";
import { NavLink } from "react-router-dom";
const descrLength = 30;
const RecipeCard = props => {
  const getPercentMatch=()=>{
    if(typeof props.recipe.percentmatch!== "undefined"){
      console.log(props.recipe.percentmatch)
      return(<p className="w3-text-green w3-container ">
      {Math.floor((props.recipe.percentmatch * 10) / 10)}% match
      </p>)
    }else{
      return;
    }
  }
  let descr = props.recipe.recipe.descr.substring(0,descrLength)
  if (props.recipe.recipe.descr.length > descrLength)
  {
    descr += "...";
  }
  return (
    <NavLink to={`/recipes/${props.recipe.recipe.id}`}>
      <div className="w3-card w3-third w3-white">
        <img
          src={props.recipe.recipe.picture}
          alt="recipe"
          style={{ width: "100%", height: "30vh" }}
        ></img>
        <div className="recipeCard">
        <h2 className="w3-container">{props.recipe.recipe.name}</h2>
        {getPercentMatch()}
        <p className="w3-container ">Description: {descr}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
