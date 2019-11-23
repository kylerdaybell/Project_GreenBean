import React from "react";

const IngredientBox = props => {
  const spanStyle = {
    border: "solid black 0.1vw",
    cursor: "pointer",
    backgroundColor: "#929292",
    marginLeft: "0.5vw",
    marginBottom: "0.25vw",
    padding: "0.25vw"
  };
  return (
    <>
      <span onClick={() => props.onClick(props.ingredient)} style={spanStyle}>
        {props.ingredient} <span className="fa fa-times" />{" "}
      </span>
    </>
  );
};

export default IngredientBox;
