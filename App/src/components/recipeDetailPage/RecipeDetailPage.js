import React from "react";
import PageTitle from "../shared/PageTitle";
import '../../css/recipeDetail.css';
import { connect } from "react-redux";

const RecipeDetailPage = props => {
  //using == instead of === intentionally
  const recipe = props.recipes.find(r => r.recipe.id == props.match.params.id);
  if (typeof recipe === "undefined") {
    return(<PageTitle title={"Recipe Not Found"}/>);
  }
  return (
  <>
  <PageTitle title={"Recipe Details"}/>
  <div className="fitbody w3-container w3-card w3-margin w3-white recipePage">
  <div className="detailPadding">
    <div className="recipeDetailTitle"><h1>{recipe.recipe.name}</h1></div>
    <span className="topAlign">
    <div className="bigpicture"><img style={{"height":"40vh" }} src={recipe.recipe.picture} alt=""/></div>
    <div className="rightOfPicture">
      <div ><p><strong>Category:</strong> {recipe.recipe.category}</p></div>
      <div ><p><strong>PrepTime:</strong> {recipe.recipe.preptime}</p></div>
      <div ><p><strong>CookTime:</strong> {recipe.recipe.cooktime}</p></div>
    </div>
    </span>
    <div><h3 >Description</h3></div>
    <div className="sectionLine"></div>
    <div ><p>{recipe.recipe.descr}</p></div>
    <div><h3>Ingredients</h3></div>
    <div className="sectionLine"></div>
    <div>{recipe.recipe.ingredientslist.map((Ingredient,key)=>(
      <p key={key}>{Ingredient.amount} {Ingredient.unit}(s) {Ingredient.name}</p>
    ))}</div>
    <div><h3 >Directions</h3></div>
    <div className="sectionLine"></div>
    <div ><p>{recipe.recipe.instructions}</p></div>
    </div>
  </div>
  
  </>
  );
};

const mapStateToProps = state => {
  return {
    recipes: [...state.greenBeanAPI.recipes, ...state.greenBeanAPI.homePageRecipes]
  };
};

export default connect(mapStateToProps, null
)(RecipeDetailPage);
