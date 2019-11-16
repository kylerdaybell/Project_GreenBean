import React from "react";
import { Route, Switch } from "react-router";
import Header from "./components/shared/Header";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutPage from "./components/loginPage/LogoutPage";
import SearchPage from "./components/searchPage/SearchPage";
import AddRecipe from "./components/addRecipePage/AddRecipe";
import RecipeDetailPage from "./components/recipeDetailPage/RecipeDetailPage";
import SideBarNav from "./components/shared/SidebarNav";
import "./css/main.css"
import "./App.css";

const App = () => {
  return (
    <div>
      <Header /> 
      <SideBarNav/>
      <div className="sideSpacer">
      <Switch className="sideSpacer">
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/new" component={AddRecipe} />
        <Route path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route path="/recipes/:id" component={RecipeDetailPage} />
      </Switch>
      </div>
    </div>
  );
};

export default App;
