import * as React from "react";
import {Redirect} from "react-router"
import { NavLink } from "react-router-dom";
import "../../css/w3.css";
import "../../css/main.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import RecipeCard from "../shared/RecipeCard";

const Header = props => {
return (
    <>
    <nav className="w3-bar navBar sideSpacer">
      <div className="input-container" >
        <button className="fa fa-search icon w3-button w3-green"
        onClick={() =>
          props.SearchForRecipeHeader(
            document.getElementById("searchName").value
            
          )
        }></button>
        <input className="input-field" type="text" placeholder="Search by Recipe Name" id="searchName"/>
        <button className="w3-btn fa fa-times w3-text-white w3-red" onClick={()=> props.SearchForRecipeHeader("aggleflaggle")}></button>
      </div> 
      <div className="searchPadding">
      <div className="w3-row-padding w3-white rowPadding">
        {props.recipesHead.map((recipe, index) => (
          <RecipeCard  recipe={recipe} key={index} />
        ))}
      </div>
      </div>
    </nav>
    <div className="spacerBar"></div>
    </>
  );
};




const mapStateToProps = state => {
  return {
    recipesHead: state.greenBeanAPI.recipesHead
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Header);