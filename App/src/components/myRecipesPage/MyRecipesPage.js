import React from "react";
import PageTitle from "../shared/PageTitle"
import { NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

const MyRecipePage = props => {
  return (
    <>
      <PageTitle title="My Recipes" />
      <div
        id="content-area"
        className="w3-container w3-row w3-center w3-display-center formFit"
      >
        <NavLink to="/myRecipes/addRecipe">
            Add Recipe
        </NavLink>
        <button className="w3-button w3-green" onClick={()=>props.ChangeMode(props.currentMode)}>Switch Mode</button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
      currentMode: state.greenBeanAPI.offlineMode
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(MyRecipePage);
