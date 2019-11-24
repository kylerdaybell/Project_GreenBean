import React from "react";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import Ingredient from "../../models/Ingredients";

const RecipeDetailPage = props => {
  const recipe = props.recipes.find(r => r.recipe.id == props.match.params.id);
  if (typeof recipe === "undefined") {
    return(<PageTitle title={"Recipe Not Found"}/>);
  }
  return (
  <>
  <PageTitle title={recipe.recipe.name}/>
  <div className="fitbody w3-container">
    
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
    recipes: [...state.greenBeanAPI.recipes, ...state.greenBeanAPI.homePageRecipes]
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(RecipeDetailPage);
