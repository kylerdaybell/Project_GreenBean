import React from 'react';

const RecipeCard = props => {
    return (
        <div className="w3-card w3-third">
            <img
              src={props.recipe.recipe.picture}
              alt="recipe picture"
              style={{ width: "100%" }}
            ></img>
            <h2 className="w3-container">{props.recipe.recipe.name}</h2>
            <p className="w3-text-green w3-container">
              Percent Match {props.recipe.percentmatch}
            </p>
            <p className="w3-container">Description{props.recipe.recipe.descr}</p>
          </div>
    );
};

export default RecipeCard;