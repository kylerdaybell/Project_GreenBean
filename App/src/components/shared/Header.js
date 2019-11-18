import * as React from "react";
import {withRouter} from "react-router-dom"
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
        onClick={() => {
          props.SearchForRecipeByName(
            document.getElementById("searchName").value
            
          );
          props.history.push('/searchByName');
          }
        }></button>
        <input className="input-field" type="text" placeholder="Search by Recipe Name" id="searchName"/>
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
)(withRouter(Header));