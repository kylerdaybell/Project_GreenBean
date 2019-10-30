import React from "react";
import IngredientAdd from "./IngredientAdd";
import RecipeAddModel from "../../models/Recipe"
import GreenBeanAPIService from "../../Services/GreenBeanAPIService"
const AddRecipeForm = () => {
  const AddRecipe = (theIngredientList) => {
    let name = document.getElementById("name").value;
    let descr = document.getElementById('description').value;
    let picture = document.getElementById('picture').value;
    let preptime= document.getElementById('prep-time').value;
    let cooktime= document.getElementById('cook-time').value;
    let instructions = document.getElementById('instructions').value;
    let email = "kyler.daybell96@gmail.com"
    let password = "9479"
    let ingredientsList = theIngredientList;
    let recipeSubmission = new RecipeAddModel(name,descr,picture,preptime,cooktime,instructions,ingredientsList,email,password );
    console.log(recipeSubmission)
    let recipeJson = JSON.stringify(recipeSubmission);
    GreenBeanAPIService.CreateNewRecipe(recipeJson);
  }
  return (
    <>
      
        <legend>Add a new Recipe:</legend>
        <label htmlFor="name">Name:</label>
        <input class="w3-input w3-border" id="name" type="text" />
        <br />
        <label htmlFor="description">Description:</label>
        <input class="w3-input w3-border" id="description" type="text" />
        <br />
        <label htmlFor="picture">Picture:</label>
        <input id="picture" type="file" />
        <br />
        <label htmlFor="prep-time">Prep-Time:</label>
        <input class="w3-input w3-border" id="prep-time" type="text" />
        <br />
        <label htmlFor="cook-time">Cook-Time:</label>
        <input class="w3-input w3-border" id="cook-time" type="text" />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <input class="w3-input w3-border" id="instructions" type="text" />
        <br />
        
    
        <IngredientAdd onSubmit={AddRecipe}/>


        
    </>
  );
};

export default AddRecipeForm;
