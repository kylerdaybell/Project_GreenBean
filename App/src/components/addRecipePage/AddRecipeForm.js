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
    let preptime = document.getElementById("prep-time").value;
    let cooktime = document.getElementById("cook-time").value;
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
      <legend>Add a new Recipe:</legend>
      <label htmlFor="name">Name:</label>
      <input className="w3-input w3-border" id="name" type="text" />
      <br />
      <label htmlFor="description">Description:</label>
      <input className="w3-input w3-border" id="description" type="text" />
      <br />
      <label htmlFor="picture">Picture:</label>
      <input id="picture" onChange={event => FilesAdded(event)} type="file" />
      <br />
      <label htmlFor="prep-time">Prep-Time:</label>
      <input className="w3-input w3-border" id="prep-time" type="text" />
      <br />
      <label htmlFor="cook-time">Cook-Time:</label>
      <input className="w3-input w3-border" id="cook-time" type="text" />
      <br />
      <label htmlFor="category">Category:</label>
      <input className="w3-input w3-border" id="category" type="text" />
      <label htmlFor="instructions">Instructions:</label>
      <input className="w3-input w3-border" id="instructions" type="text" />
      <br />

      <IngredientAdd onSubmit={AddRecipe} />
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
