import * as React from "react";
import { NavLink } from "react-router-dom";
import "../../css/w3.css";

const Header = () => {
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
    </nav>
  );
};

export default Header;