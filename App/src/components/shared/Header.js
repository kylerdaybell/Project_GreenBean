import * as React from "react";
import { withRouter } from "react-router-dom";
import "../../css/w3.css";
import "../../css/main.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const Header = props => {
  const submitIfEnter = event => {
    if (event.key === "Enter") {
      props.SearchForRecipeByName(event.target.value);
      props.history.push("/searchByName");
    }
  };
  return (
    <>
      <nav className="w3-bar navBar sideSpacer">
        <div className="input-container">
          <i className="fa fa-search icon w3-white"></i>
          <input
            className="input-field"
            type="text"
            placeholder="Search by Recipe Name"
            id="searchName"
            onKeyDown={(event)=>submitIfEnter(event)}
          />
          <button
            className="w3-button navButton w3-green"
            onClick={() => {
              props.SearchForRecipeByName(
                document.getElementById("searchName").value
              );
              props.history.push("/searchByName");
            }}
          >
            Search
          </button>
        </div>
      </nav>
      <div className="spacerBar"></div>
    </>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(Header));
