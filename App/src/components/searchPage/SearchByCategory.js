import React from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import recipeCategories from "../addRecipePage/recipeCategories"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
const SearchByCategory = props => {
  var selectedItem = "";
  if (props.recipes.length > 0)
  {
    selectedItem = props.recipes[0].recipe.category;
  }
  return (
    <>
    
      <PageTitle title={"Search By Category"} />
      <div className="fitBody"> 
      <div className="searchBarLayout">
      <select className="w3-select w3-border" id="category" name="option" onChange={() =>
          props.SearchForRecipeByCategory(document.getElementById("category").value)
        }>
        <option value="" disabled selected>No Category Selected</option>
        {recipeCategories.map((category, key)=> (
          <option key={key} value={category[0]}>{category[0]}</option>
        ))}
      </select>
      </div>
      <div className="w3-row-padding">
        {props.recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    recipes: state.greenBeanAPI.recipes
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(SearchByCategory);
