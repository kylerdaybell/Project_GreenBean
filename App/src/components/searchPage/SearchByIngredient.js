import React, { useState } from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import IngredientBox from "./IngredientBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import SearchBar from "../shared/SearchBar";

const SearchPage = props => {
  const [ingredientList, setIngredientList] = useState([]);

  const ingredientSearchOverride = (event) => {
    if(event.key === 'Tab' || event.key === ',' || event.key === 'Enter'){
      if(event.target.value === "" || typeof ingredientList.find(i=>i === event.target.value) !== 'undefined'){
        setIngredientList([...ingredientList]);
        return;
      }
      setIngredientList([...ingredientList, event.target.value])
    }if(event.key === 'Enter'){
      searchForRecipeByIngredient(event.target.value);
    }
  }

  const deleteIngredient = (ingredient) => {
    setIngredientList(ingredientList.filter(i=>i!==ingredient))
  }

  const searchForRecipeByIngredient = (ingredient="") => {
    let searchParameters = `${ingredient},`;
    ingredientList.forEach(element => {
      searchParameters = searchParameters.concat(element, ",");
    });
    props.SearchForRecipeByIngredient(searchParameters);
  }

  return (
    <>
      <PageTitle title={"Search By Ingredients"} />
      <div className="fitBody">
        <div id="content-area" className="w3-container"></div>

          {ingredientList.map((ingredient, key) => (
            <IngredientBox key={key} ingredient={ingredient} onClick={deleteIngredient} />
          ))}
        <SearchBar searchFunction={searchForRecipeByIngredient} overrideFunction={ingredientSearchOverride} clearBar focus/>
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

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(SearchPage);
