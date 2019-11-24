import React from "react";
import PageTitle from "../shared/PageTitle";
import RecipeCard from "../shared/RecipeCard";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import SearchBar from "../shared/SearchBar";
const SearchByNamePage = props => {
  return (
    <>
      <PageTitle title={"Search By Name"} />
      <div className="fitBody">
        <SearchBar searchFunction={props.SearchForRecipeByName} focus/>
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
)(SearchByNamePage);
