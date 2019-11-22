import React, { useState, useRef, useEffect } from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
const SearchPage = props => {
  const [ingredientList, setIngredientList] = useState([]);
  const inputRef = useRef(null);

  useEffect(()=>{
    inputRef.current.focus();
    inputRef.current.value="";
  });

  const checkTab = (event) => {
    console.log(event.key)
    if(event.key === 'Tab' || event.key === ',' || event.key === 'Enter'){
      setIngredientList([...ingredientList, event.target.value])
    }if(event.key === 'Enter'){
      searchForRecipeByIngredient();
    }
  }

  const deleteIngredient = (ingredient) => {
    setIngredientList(ingredientList.filter(i=>i!==ingredient))
  }

  const searchForRecipeByIngredient = () => {
    let searchParameters = "";
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

        <span>
          {ingredientList.map((ingredient, key) => (
            <span key={key} onClick={()=>deleteIngredient(ingredient)}>{ingredient}  </span>
          ))}
          <input
            ref={inputRef}
            id="ingredientSearchBox"
            className="w3-input w3-border"
            type="text"
            placeholder="search"
            onKeyDown={(event)=>checkTab(event)}
          />
        </span>
        <button
          onClick={() =>searchForRecipeByIngredient()}
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

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(SearchPage);
