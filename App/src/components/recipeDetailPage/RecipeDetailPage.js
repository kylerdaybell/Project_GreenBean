import React from "react";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const RecipeDetailPage = props => {
  console.log(props.match.params.id);
  console.log(props.recipes);
  const recipe = props.recipes.find(r => r.recipe.id == props.match.params.id);
  if (typeof recipe === "undefined") {
    return(<div>Recipe Not Found</div>);
  }
  return (
  <>
  <div className="fitBody">{recipe.recipe.name}</div>
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
)(RecipeDetailPage);
