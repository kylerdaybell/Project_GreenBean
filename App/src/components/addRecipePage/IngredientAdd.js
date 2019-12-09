import React, {useState, useRef, useEffect} from "react";

import ingredientUnits from "./ingredientUnits";
import "../../css/main.css"; 
import "../../css/addRecipe.css"

const IngredientAdd = props => {
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  const unitRef = useRef(null);
  const [ingredientArray, setIngredientArray] = useState([]);

  useEffect(()=>{
    nameRef.current.value = "";
    amountRef.current.value = "";
  })

  const removeIngredient = (ingredient) => {
      let newArray = ingredientArray.filter(i => i !== ingredient);
      setIngredientArray(newArray);
  }

  const addIngredient = () => {
      nameRef.current.focus();
      let ingredient = {name:"",amount:0,unit:""};
      ingredient.name = nameRef.current.value;
      ingredient.amount = amountRef.current.value;
      ingredient.unit = unitRef.current.value;
      setIngredientArray([ingredient, ...ingredientArray])
  }
  const addAmount = (amount) => {
    if (amount > 1){
      return "s";
    }
  }
  return (
    <>
      <div className="w3-row">
        <input ref={nameRef} className="w3-input ingredientBoxPadding w3-quarter w3-border" type="text" placeholder="Name"/>
        <input ref={amountRef} className="w3-input ingredientBoxPadding w3-quarter w3-border" type="number" placeholder="Amount"/>
         <select ref={unitRef}className="w3-select ingredientBoxPadding w3-quarter w3-border" name="option" placeholder="noneSelected">
        <option value="" disabled placeholder="Measurement" selected>Measurement</option>
        {ingredientUnits.map((unit, key)=> (
          <option value="" key={key} value={unit}>{unit}</option>
        ))}
      </select>
        <button className = "ingredientBoxPadding w3-green searchButton fas fa-plus" onClick={() => addIngredient()}></button>
      </div>
      {ingredientArray.map((ingredient) => (
      <div className="ingredientAlign">
        <div className="ingredientButton" onClick={()=>removeIngredient(ingredient)}>
          <span>
            {ingredient.amount} {ingredient.unit}{addAmount(ingredient.amount)} {ingredient.name}
          </span>
          <i className="w3-button w3-hover-red fa fa-times"></i>
          <br />
        </div>
      </div>
      ))}
      <button className="w3-green searchButton submitButton" onSubmit={() => props.onSubmit(ingredientArray)}>
      Create Recipe
      <i className="fa fa-fw fa-file-upload" style={{ fontSize: '1.5em' }} />
      </button>
    </>
  );
};

export default IngredientAdd;
