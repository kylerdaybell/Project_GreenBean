import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/cards.css';
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
  return (
    <NavLink to={`/recipes/${props.recipe.recipe.id}`}>
    <div className="w3-third">
      <div className="w3-white cardSpacing card" >
        <img
          src={props.recipe.recipe.picture}
          alt="recipe"
          style={{ width: "100%", height: "30vh" }}
        ></img>
        <div className="recipeCard">
        <h2 className="w3-container"><p>{props.recipe.recipe.name}</p></h2>
        <p>{getPercentMatch()}</p>
        <p className="w3-container ">Description: {props.recipe.recipe.descr}</p>
      </div>
    </div>
    </div>
    </NavLink>
  );
};

export default RecipeCard;
