import React from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import "../../css/main.css";
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
      <div className="searchSpan">
      <select className="w3-select w3-border categorySearch" defaultValue={selectedItem} id="category" name="option" onChange={(event) =>
          props.SearchForRecipeByCategory(event.target.value)
        }>
        <option value="" disabled>No Category Selected</option>
        {recipeCategories.map((category, key)=> (
          <option key={key} value={category[0]}>{category[0]}</option>
        ))}
      </select>
      </div>
      </div>
      <div className="homeRecipePadding">
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
