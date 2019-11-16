import * as React from "react";
import { NavLink } from "react-router-dom";
import "../../css/w3.css";
import "../../css/main.css";
import { connect } from "react-redux";
import SideBarNav from "../shared/SidebarNav";

const Header = props => {
  const LogoutLogin = () => {
    if(props.credentials.loggedIn){
      return (
        <NavLink className="w3-bar-item w3-display-topright navButton" to="/logout">
          Logout
        </NavLink>
      )
    }
    return (
      <NavLink className="w3-bar-item w3-display-topright navButton" to="/login">
        Login
      </NavLink>
    )
  }
  return (
    <>
    <nav className="w3-bar navBar sideSpacer">
      {}
      <div className="input-container" >
        <i className="fa fa-search icon"></i>
        <input className="input-field" type="text" placeholder="Search by Recipe Name" name="srchName"/>
      </div>
      {LogoutLogin()}
    </nav>
    <div className="spacerBar"></div>
    </>
  );
};

const mapStateToProps = state => {
  return {
      credentials: state.greenBeanAPI.credentials
  }
}

export default connect(
  mapStateToProps,
  null
  )(Header);