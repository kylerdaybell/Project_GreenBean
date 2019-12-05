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
  const displaySearchBar = () => {
    if(props.history.location.pathname.toLowerCase().includes("search") === false){
      return <>
        <SearchBar searchFunction={headerSearch} placeholder="Search By Recipe Name" />
      </>
    }
  }
  return (
    <>
      <nav className="w3-bar navBar">
        <button
        onClick={() =>
          props.history.goBack()
        }
        className="backButton fa fa-arrow-left"
      > Back</button>
        <div className="input-container">
          {displaySearchBar()}
        </div>
      </nav>
      <div className="spacerBar"></div>
    </>
  );
};

export default connect(null, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(Header));
