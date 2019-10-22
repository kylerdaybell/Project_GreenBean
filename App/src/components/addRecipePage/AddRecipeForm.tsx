import * as React from "react";
import IngredientItem, {Ingredient} from "./IngredientItem";



const AddRecipeForm = () => {
  let ingredientArray = Array<Ingredient>();
  
  return (
    <form>
      <fieldset>
        <legend>Add a new Recipe:</legend>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
        <br/>
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" />
        <br/>
        <label htmlFor="picture">Picture:</label>
        <input id="picture" type="file"/>
        <br/>
        <label htmlFor="prep-time">Prep-Time:</label>
        <input id="prep-time" type="text" />
        <br/>
        <label htmlFor="cook-time">Cook-Time:</label>
        <input id="cook-time" type="text" />
        <br/>
        <label htmlFor="instructions">Instructions:</label>
        <input id="instructions" type="text"/>
        {ingredientArray.map(ingredient=><IngredientItem {...ingredient}/>)}
        <button>Add Ingredient</button>
        <br/>
      </fieldset>
    </form>
  );
};

export default AddRecipeForm;
