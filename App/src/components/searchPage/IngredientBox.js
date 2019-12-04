import React from "react";
import "../../css/search.css"
const IngredientBox = props => {
 
  return (
    <>
      <span className="ingredientSearchBox" onClick={() => props.onClick(props.ingredient)}>
        {props.ingredient} 
        <div className="fa fa-times iconColor" />
        </span>
    </>
  );
};

export default IngredientBox;
