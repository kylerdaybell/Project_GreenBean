import * as React from "react";
import { withRouter } from "react-router-dom";
import "../../css/w3.css";
import "../../css/main.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import SearchBar from "./SearchBar";

const Header = props => {
  const headerSearch = searchVal => {
    props.SearchForRecipeByName(searchVal);
    props.history.push("/searchByName");
  };
  return (
    <>
      <nav className="w3-bar navBar">
        <div className="input-container">
          <i className="fa fa-search icon w3-white"></i>
          <SearchBar searchFunction={headerSearch} placeholder="Search By Recipe Name" />
        </div>
      </nav>
      <div className="spacerBar"></div>
    </>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(Header));
