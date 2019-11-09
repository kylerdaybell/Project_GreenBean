import React, { useState } from "react";
import PageTitle from "../shared/PageTitle";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService";
import RecipeCard from "../shared/RecipeCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const SearchPage = props => {
  const [recipeResults, setRecipeResults] = useState([]);
  const SearchAPIByName = async () => {
    let SearchTerm = document.getElementById("nameSearchBox").value;
    let recipes = await GreenBeanAPIService.SearchForRecipeByName(SearchTerm);
    setRecipeResults(recipes);
  };
  const SearchAPIByIngredient = async () => {
    let SearchTerm = document.getElementById("ingredientSearchBox").value;
    let recipes = await GreenBeanAPIService.SearchForRecipeByIngredient(
      SearchTerm
    );
    setRecipeResults(recipes);
  };
  return (
    <>
      <PageTitle title={"Search Page"} />
      <div id="content-area" className="w3-container"></div>
      {/* <input id="nameSearchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPIByName()} className="w3-button w3-green ">search</button> */}
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
