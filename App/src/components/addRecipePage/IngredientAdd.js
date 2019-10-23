import React, {useState} from "react";

const IngredientAdd = props => {
  const [ingredientArray, setIngredientArray] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");

  const removeIngredient = (ingredient) => {
      let newArray = ingredientArray.filter(i => i != ingredient);
      setIngredientArray(newArray);
  }

  const addIngredient = () => {
      let ingredient = {name:"",amount:0,unit:""};
      ingredient.name = name
      ingredient.amount = amount;
      ingredient.unit = unit
      setIngredientArray([ingredient, ...ingredientArray])
      console.log(ingredientArray);
  }

  return (
    <>
      <div class="w3-row">
        <input  class="w3-input w3-quarter w3-border" onChange={(event) => setName(event.target.value)} type="text" placeholder="name" value={name}/>
        <input  class="w3-input w3-quarter w3-border" onChange={(event) => setAmount(Number(event.target.value))} type="number" placeholder="amount" value={amount}/>
        <input  class="w3-input w3-quarter w3-border" onChange={(event) => setUnit(event.target.value)} type="text" placeholder="unit" value={unit}/>
        <button class = "w3-btn w3-hover-green"onClick={() => addIngredient()}>Add</button>
      </div>
      {ingredientArray.map((ingredient) => (
        <div >
          <span>
            {ingredient.name} {ingredient.amount} {ingredient.unit}/s
          </span>
          <button class="w3-button w3-hover-red"onClick={()=>removeIngredient(ingredient)}>remove</button>
          <br />
        </div>
      ))}

      <button class="w3-btn w3-green " onClick={() => props.onSubmit(ingredientArray)}>create recipe</button>
    </>
  );
};

export default IngredientAdd;
