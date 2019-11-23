import React from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import SearchBar from "../shared/SearchBar";
import recipeCategories from "../addRecipePage/recipeCategories"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
const SearchByCategory = props => {
  return (
    <>
    
      <PageTitle title={"Search By Category"} />
      <div className="fitBody">
      <select className="w3-select w3-border" id="category" name="option" >
        <option value="" disabled selected>Category</option>
        {recipeCategories.map((category, key)=> (
          <option key={key} value={category}>{category}</option>
        ))}
      </select>
      <button
        onClick={() =>
          props.SearchForRecipeByCategory(document.getElementById("category"))
        }
        className="w3-button w3-green "
      >
        search
      </button>
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
