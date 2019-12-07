import React from "react";
import IngredientAdd from "./IngredientAdd";
import RecipeAddModel from "../../models/Recipe";
import recipeCategories from "./recipeCategories";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import Resizer from 'react-image-file-resizer';

const AddRecipeForm = props => {
  let image = "";

  const FilesAdded = event => {
    let files = document.getElementById("picture").files[0];
    if (files)
    {
      Resizer.imageFileResizer(
        files,
        756,
        756,
        'JPEG',
        100,
        0,
        uri=>{image = uri;
        console.log(image);},
        'base64'
      );
    }
  };

  const showPopup = element=>{
    var x = document.getElementById(element);
    x.className = "show"
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      return;
  }

  const AddRecipe = theIngredientList => {
    let name = document.getElementById("name").value;
    let descr = document.getElementById("description").value;
    //get the hours and minutes
    let preptimehours = document.getElementById("prep-time-hours").value;
    let preptimeminutes = document.getElementById("prep-time-minutes").value;
    //merge the time into the standard time format
    let preptime = preptimehours+":"+preptimeminutes+":00";
    //get the hours and minutes
    let cooktimeminutes = document.getElementById("cook-time-minutes").value;
    let cooktimehours = document.getElementById("cook-time-hours").value;
        //merge the time into the standard time format
    let cooktime = cooktimehours+":"+cooktimeminutes+":00";
    let category = document.getElementById("category").value;
    let instructions = document.getElementById("instructions").value;
    let ingredientsList = theIngredientList;
    let recipeSubmission = new RecipeAddModel(
      name,
      descr,
      image,
      preptime,
      cooktime,
      category,
      instructions,
      ingredientsList,
      props.credentials.email,
      props.credentials.password
    );
    let recipeJson = JSON.stringify(recipeSubmission);
    props.CreateNewRecipe(recipeJson).then(success=>{
      if(success !== true){
        showPopup("snackbar");
      }else{
        showPopup("successSnackbar");
      }
    return;
  }
  );;
  };

  return (
    <>
      <div id="snackbar">Add Failed</div>
      <div id="successSnackbar">Add Successful!</div>
      <div className="fitBody">
      <label htmlFor="name">Name:</label>
      <input className="w3-input w3-border" id="name" type="text" />
      <br />
      <label htmlFor="picture">Picture:</label>
      <input id="picture" onChange={event => FilesAdded(event)} type="file" />
      <br />
      <label htmlFor="category">Category:</label>
      <select className="w3-select w3-border" id="category" name="option" required>
        <option value="" disabled selected>Category</option>
        {recipeCategories.map((category, key)=> (
          <option key={key} value={category[0]}>{category[0]}</option>
        ))}
      </select>
      <span>
        <label htmlFor="prep-time" style={{display: 'block'}}>Prep-Time HH:MM:</label>
        <input className="w3-input w3-border timeBoxes timeBox" id="prep-time-hours" 
        type="number" min="0" max="99" defaultValue="0" />
        <div className="timeBoxes">  :  </div>
        <input className="w3-input w3-border timeBoxes timeBox" id="prep-time-minutes" 
        type="number" min="0" max="59" defaultValue="0" />
      <br />
      <span>
        <label htmlFor="cook-time" style={{display: 'block'}}>Cook-Time HH:MM:</label>
        <input className="w3-input w3-border timeBoxes timeBox" id="cook-time-hours" type="number" min="0" max="99" defaultValue="0"/>
        <div className="timeBoxes">  :  </div>
        <input className="w3-input w3-border timeBoxes timeBox" id="cook-time-minutes" type="number" min="0" max="59" defaultValue="0"/>
      </span>
      <br />
      </span>
      <label htmlFor="instructions">Instructions:</label>
      <textarea className="w3-input w3-border inputField" id="instructions"/>
      <br />
      <label htmlFor="description">Description:</label>
      <textarea className="w3-input w3-border inputField" id="description"/>
      <br />
      <h3>Add Ingredients</h3>
      <IngredientAdd onSubmit={AddRecipe} />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
      credentials: state.credentials
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(AddRecipeForm);