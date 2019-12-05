import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/cards.css';
const RecipeCard = props => {
  const getPercentMatch=()=>{
    if(typeof props.recipe.percentmatch!== "undefined"){
      return(<div className="w3-text-green">
      {Math.floor((props.recipe.percentmatch * 10) / 10)}% match
      </div>)
    }else{
      return;
    }
  }
  return (
    <NavLink to={`/recipes/${props.recipe.recipe.id}`}>
    <div className="flexContainer">
      <div className="w3-white cardSpacing card" >
        <img
          src={props.recipe.recipe.picture}
          alt="recipe"></img>
        <div className="recipeCard">
        <h2 className="cardText  w3-container ">{props.recipe.recipe.name}</h2>
        <div className="cardText  w3-container ">{getPercentMatch()}</div>
        <div className="cardText  w3-container ">Description: {props.recipe.recipe.descr}</div>
      </div>
    </div>
    </div>
    </NavLink>
  );
};

export default RecipeCard;
