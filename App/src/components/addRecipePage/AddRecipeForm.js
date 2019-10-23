import React from "react";
import IngredientAdd from "./IngredientAdd";
import RecipeAddModel from "../../models/Recipe"

const AddRecipeForm = () => {


  const postToDB = (recipe) => {
    let str = `{
      "name": "chicken a la brandon",
      "descr": "chicken on icecream",
      "picture": "Fake url",
      "preptime": "00:05:00",
      "cooktime": "00:00:00",
      "instructions": "put raw chicken on icecream and then serve",
      "ingredientslist": [{"name":"chicken","amount":"10","unit":"cups"},{"name":"icecream","amount":"10","unit":"cups"}],
      "email": "test@gmail.com",
      "password": "test"
  }`;
    console.log("hi guys")
    fetch("http://api.greenbeancooking.com/createrecipe",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
      body: str
    }).then(response=>response.json).then(data=>console.log(data))
  } 

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
    let recipeJson = JSON.stringify(recipeSubmission);
    postToDB(recipeJson);
  }
  return (
    <>
      
        <legend>Add a new Recipe:</legend>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" />
        <br />
        <label htmlFor="description">Description:</label>
        <input id="description" type="text" />
        <br />
        <label htmlFor="picture">Picture:</label>
        <input id="picture" type="file" />
        <br />
        <label htmlFor="prep-time">Prep-Time:</label>
        <input id="prep-time" type="text" />
        <br />
        <label htmlFor="cook-time">Cook-Time:</label>
        <input id="cook-time" type="text" />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <input id="instructions" type="text" />
        <br />
        
    
        <IngredientAdd onSubmit={AddRecipe}/>


        
    </>
  );
};

export default AddRecipeForm;
