import React from "react";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import Ingredient from "../../models/Ingredients";

const RecipeDetailPage = props => {
  console.log(props.match.params.id);
  console.log(props.recipes);
  const recipe = props.recipes.find(r => r.recipe.id == props.match.params.id);
  if (typeof recipe === "undefined") {
    return(<div className="fitbody w3-container"><h1 className="w3-green">Recipe Not Found</h1></div>);
  }
  return (
  <>
  <div className="fitbody w3-container">
    <div className="w3-green"><h1>{recipe.recipe.name}</h1></div>
    <div className="bigpicture"><img style={{"height":"40vh"}} src={recipe.recipe.picture }/></div>
    <div ><p className="w3-text-green">{recipe.recipe.category}</p></div>
    <div ><p>{recipe.recipe.descr}</p></div>
    <div><h3>Directions</h3></div>
    <div ><p>{recipe.recipe.instructions}</p></div>
    <div ><p>PrepTime: {recipe.recipe.cooktime}</p></div>
    <div ><p>CookTime: {recipe.recipe.cooktime}</p></div>
    <div><h3>Ingredients</h3></div>
    <div>{recipe.recipe.ingredientslist.map((Ingredient,key)=>(
      <p key={key}>{Ingredient.amount} {Ingredient.unit}(s) {Ingredient.name}</p>
    ))}</div>
  </div>
  
  </>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.greenBeanAPI.recipes
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(RecipeDetailPage);
