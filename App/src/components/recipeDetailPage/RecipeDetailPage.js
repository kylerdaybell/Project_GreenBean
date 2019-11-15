import React from "react";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const RecipeDetailPage = props => {
  console.log(props.match.params.id);
  const recipe = props.recipes.find(r=> r.id === props.match.params.id);
  console.log(recipe);
  if (typeof recipe === "undefined") {
    return(<div>Recipe Not Found</div>);
  }
  return (
  <>
  <div className="w3-container">recipe.name</div>
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
