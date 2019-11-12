import React from "react";
import IngredientAdd from "./IngredientAdd";
import RecipeAddModel from "../../models/Recipe";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const AddRecipeForm = props => {
  var image = ""
  const FilesAdded = (event)=>{
    console.log("helppppp")
    let files = document.getElementById("picture").files[0];
    var reader = new FileReader();
    console.log(files)
    reader.readAsDataURL(files);
    
    reader.onload = function(){
      image = reader.result;
      console.log(image)
    }
  }
  const AddRecipe = (theIngredientList) => {
    let name = document.getElementById("name").value;
    let descr = document.getElementById('description').value;
    let preptime= document.getElementById('prep-time').value;
    let cooktime= document.getElementById('cook-time').value;
    let instructions = document.getElementById('instructions').value;
    let email = "kyler.daybell96@gmail.com"
    let password = "9479"
    let ingredientsList = theIngredientList;
    let recipeSubmission = new RecipeAddModel(name,descr,image,preptime,cooktime,instructions,ingredientsList,email,password );
    let recipeJson = JSON.stringify(recipeSubmission);
    props.CreateNewRecipe(recipeJson);
  }
  return (
    <>
        <legend>Add a new Recipe:</legend>
        <label htmlFor="name">Name:</label>
        <input className="w3-input w3-border" id="name" type="text" />
        <br />
        <label htmlFor="description">Description:</label>
        <input className="w3-input w3-border" id="description" type="text" />
        <br />
        <label htmlFor="picture" >Picture:</label>
        <input id="picture" onChange={event=>FilesAdded(event)} type="file" />
        <br />
        <label htmlFor="prep-time">Prep-Time:</label>
        <input className="w3-input w3-border" id="prep-time" type="text" />
        <br />
        <label htmlFor="cook-time">Cook-Time:</label>
        <input className="w3-input w3-border" id="cook-time" type="text" />
        <br />
        <label htmlFor="instructions">Instructions:</label>
        <input className="w3-input w3-border" id="instructions" type="text" />
        <br />
        
        <IngredientAdd onSubmit={AddRecipe}/>
    </>
  );
};

export default connect(
  null,
  dispatch => bindActionCreators(actionCreators,dispatch)
  )(AddRecipeForm);
