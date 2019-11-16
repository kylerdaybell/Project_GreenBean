import React from "react";
import IngredientAdd from "./IngredientAdd";
import RecipeAddModel from "../../models/Recipe";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Resizer from 'react-image-file-resizer';

const AddRecipeForm = props => {
  let image = "";

  const FilesAdded = event => {
    let files = document.getElementById("picture").files[0];
    if (files)
    {
      Resizer.imageFileResizer(
        files,
        512,
        512,
        'JPEG',
        100,
        0,
        uri=>{image = uri;
        console.log(image);},
        'base64'
      );
    }
  };



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
    props.CreateNewRecipe(recipeJson);
  };

  return (
    <>
      <div className="fitBody">
      <label htmlFor="name">Name:</label>
      <input className="w3-input w3-border" id="name" type="text" />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea className="w3-input w3-border inputField" id="description"/>
      <br />
      <label htmlFor="picture">Picture:</label>
      <input id="picture" onChange={event => FilesAdded(event)} type="file" />
      <br />
      <span>
        <label htmlFor="prep-time" style={{display: 'block'}}>Prep-Time HH:MM:</label>
        <input className="w3-input w3-border timeBoxes timeBox" id="prep-time-hours" type="number" defaultValue="0" />
        <div className="timeBoxes">  :  </div>
        <input className="w3-input w3-border timeBoxes timeBox" id="prep-time-minutes" type="number" defaultValue="0" />
      </span>
      <br />
      <span>
        <label htmlFor="cook-time" style={{display: 'block'}}>Cook-Time HH:MM:</label>
        <input className="w3-input w3-border timeBoxes timeBox" id="cook-time-hours" type="number" min="0" defaultValue="0"/>
        <div className="timeBoxes">  :  </div>
        <input className="w3-input w3-border timeBoxes timeBox" id="cook-time-minutes" type="number" defaultValue="0"/>
      </span>
      <br />
      <label htmlFor="category">Category:</label>
      <select className="w3-select w3-border" id="category" name="option" >
        <option value="" disabled selected>Choose your option</option>
        <option value="Appetizers">Appetizers</option>
        <option value="Main Courses">Main Courses</option>
        <option value="Desserts">Desserts</option>
      </select>
      <label htmlFor="instructions">Instructions:</label>
      <textarea className="w3-input w3-border inputField" id="instructions"/>
      <br />

      <IngredientAdd onSubmit={AddRecipe} />
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
      credentials: state.greenBeanAPI.credentials
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(AddRecipeForm);

//

