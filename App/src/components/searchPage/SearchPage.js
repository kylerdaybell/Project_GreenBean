import React from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

import SideBarNav from "../shared/SidebarNav";
const SearchPage = props => {
  return (
    <>
    
      <PageTitle title={"Search Page"} />
      <div className="fitBody">
      <div id="content-area" className="w3-container"></div>
      <input
        id="ingredientSearchBox"
        className="w3-input w3-border"
        type="text"
        placeholder="search"
      />
      <button
        onClick={() =>
          props.SearchForRecipeByIngredient(
            document.getElementById("ingredientSearchBox").value
          )
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
)(SearchPage);
