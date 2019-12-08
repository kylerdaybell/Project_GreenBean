import React, { useState } from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import IngredientBox from "./IngredientBox";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import SearchBar from "../shared/SearchBar";
import "../../css/search.css";
import "../../css/main.css";

const SearchPage = props => {
  const [ingredientList, setIngredientList] = useState([]);

  const setIngredients = (ingredient) => {
    if(ingredient === "" || typeof ingredientList.find(i=>i === ingredient) !== 'undefined'){
      setIngredientList([...ingredientList]);
      return;
    }else{
      setIngredientList([...ingredientList, ingredient])
    }
  }
  
  const deleteIngredient = (ingredient) => {
    let filtered = ingredientList.filter(i=>i!==ingredient)
    setIngredientList(filtered);
    searchForRecipeByIngredient("", filtered)
  }
  
  const ingredientSearchOverride = (event) => {
    if(event.key === 'Tab' || event.key === ',' || event.key === 'Enter'){
      setIngredients(event.target.value)
      searchForRecipeByIngredient(event.target.value);
    }
  }
  
  const searchFunction = (ingredient) => {
    setIngredients(ingredient);
    searchForRecipeByIngredient(ingredient);
  }

  const searchForRecipeByIngredient = (ingredient="", ingredients=ingredientList) => {
    let searchParameters = `${ingredient},`;
    ingredients.forEach(element => {
      searchParameters = searchParameters.concat(element, ",");
    });
    props.SearchForRecipeByIngredient(searchParameters);
  }
  return (
    <>
      <PageTitle title={"Search By Ingredients"} />
      <div className="fitBody">
        <div id="content-area" className="w3-container">
          <div className="ingredientBox">
          {ingredientList.map((ingredient, key) => (
            <IngredientBox key={key} ingredient={ingredient} onClick={deleteIngredient} />
          ))}
          </div>
          
          <div className="searchSpan">
            <SearchBar placeholder={"Type Ingredient then press Enter"} searchFunction={searchFunction} overrideFunction={ingredientSearchOverride} clearBar focus/>
            </div>
        <div className="homeRecipePadding">
          {props.recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
        </div>
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
