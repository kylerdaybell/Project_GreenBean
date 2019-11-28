import React, {useState, useRef, useEffect} from "react";

const IngredientAdd = props => {
  const nameRef = useRef(null);
  const amountRef = useRef(null);
  const unitRef = useRef(null);
  const [ingredientArray, setIngredientArray] = useState([]);

  useEffect(()=>{
    nameRef.current.value = "";
    amountRef.current.value = "";
    unitRef.current.value = "";
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

  return (
    <>
      <div className="w3-row">
        <input ref={nameRef} className="w3-input w3-quarter w3-border" type="text" placeholder="name"/>
        <input ref={amountRef} className="w3-input w3-quarter w3-border" type="number" placeholder="amount"/>
        <input ref={unitRef} className="w3-input w3-quarter w3-border" type="text" placeholder="unit"/>
        <button className = "w3-btn w3-hover-green fas fa-plus" onClick={() => addIngredient()}></button>
      </div>
      {ingredientArray.map((ingredient) => (
        <div >
          <span>
            {ingredient.name} {ingredient.amount} {ingredient.unit}/s
          </span>
          <button className="w3-button w3-hover-red far fa-trash-alt"onClick={()=>removeIngredient(ingredient)}></button>
          <br />
        </div>
      ))}

      <button className="w3-btn w3-green" onClick={() => props.onSubmit(ingredientArray)}>create recipe</button>
    </>
  );
};

export default IngredientAdd;
