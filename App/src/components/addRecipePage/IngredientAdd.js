import React, {useState} from "react";

const IngredientAdd = props => {
  const [ingredientArray, setIngredientArray] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");

  const removeIngredient = (ingredient) => {
      console.log(ingredient);
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
      <div>
        <input onChange={(event) => setName(event.target.value)} type="text" placeholder="name" value={name}/>
        <input onChange={(event) => setAmount(Number(event.target.value))} type="number" placeholder="amount" value={amount}/>
        <input onChange={(event) => setUnit(event.target.value)} type="text" placeholder="unit" value={unit}/>
        <button onClick={() => addIngredient()}>Add</button>
      </div>
      {ingredientArray.map((ingredient) => (
        <div >
          <span>
            {ingredient.name} {ingredient.amount} {ingredient.unit}/s
          </span>
          <button onClick={()=>removeIngredient(ingredient)}>Delete</button>
          <br />
        </div>
      ))}

      <button onClick={() => props.onSubmit(ingredientArray)} >Submit</button>
    </>
  );
};

export default IngredientAdd;
