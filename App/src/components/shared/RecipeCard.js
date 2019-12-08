import React from "react";
import { NavLink } from "react-router-dom";
import '../../css/cards.css';
const RecipeCard = props => {
  const getPercentMatch=()=>{
    if(typeof props.recipe.percentmatch!== "undefined"){
      return(<><div className="cardText w3-text-green percentMatchText">
      Ingredients you have:
       <div className="percentMatchBox">
      <div className="percentMatch">{Math.floor((props.recipe.percentmatch * 10) / 10)}%
      </div>
      </div>
      </div>
     
      </>)
    }else{
      return;  
    }
  }
  return (
    <NavLink to={`/recipes/${props.recipe.recipe.id}`}>
    <div className="flexContainer w3-animate-left">
      <div className="w3-white cardSpacing card" >
        <img id="image"
            src={props.recipe.recipe.picture}
          alt="recipe"></img>
        <div className="recipeCard">
        <h2 className="cardText">{props.recipe.recipe.name}</h2>
        <div className="cardText">{getPercentMatch()}</div>
        <div className="cardText">Description: {props.recipe.recipe.descr}</div>
      </div>
    </div>
    </div>
    </NavLink>
  );
};

export default RecipeCard;
