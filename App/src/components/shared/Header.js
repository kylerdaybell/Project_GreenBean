import * as React from "react";
import { NavLink } from "react-router-dom";
import "../../css/w3.css";
import { connect } from "react-redux";

const Header = props => {
  const LogoutLogin = () => {
    if(props.credentials.loggedIn){
      return (
        <NavLink className="w3-bar-item w3-white w3-button w3-hover-green w3-display-topright" to="/logout">
          Logout
        </NavLink>
      )
    }
    return (
      <NavLink className="w3-bar-item w3-white w3-button w3-hover-green w3-display-topright" to="/login">
        Login
      </NavLink>
    )
  }
  return (
    <nav className="w3-bar">
      <NavLink exact className="w3-bar-item w3-white w3-button w3-hover-green" to="/">
        Home
      </NavLink>
      <NavLink className="w3-bar-item w3-white w3-button w3-hover-green" to="/search">
        Search
      </NavLink>
      <NavLink className="w3-bar-item w3-white w3-button w3-hover-green" to="/new">
        Add Recipe
      </NavLink>
      {LogoutLogin()}
    </nav>
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