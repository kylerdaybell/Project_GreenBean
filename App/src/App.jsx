import React from "react";
import { Route, Switch } from "react-router";
import Header from "./components/shared/Header";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import LogoutPage from "./components/loginPage/LogoutPage";
import SearchPage from "./components/searchPage/SearchByIngredient";
import AddRecipe from "./components/addRecipePage/AddRecipe";
import RecipeDetailPage from "./components/recipeDetailPage/RecipeDetailPage";
import SideBarNav from "./components/shared/SidebarNav";
import SearchByName from "./components/searchPage/SearchByNamePage";
import SearchByCategory from "./components/searchPage/SearchByCategory";
import Register from "./components/Register/register";
import MyRecipePage from "./components/myRecipesPage/MyRecipesPage";
import { connect } from "react-redux";
import "./css/main.css";
import "./App.css";
import WindowFrame from "./components/shared/WindowFrame";

const App = props => {
  const onlinePages = () => {
    if (props.offlineMode === false) {
      return (
        <>
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/register" component={Register} />
        </>
      );
    }
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <WindowFrame />

      <div className="sideSpacer">
        <Header />
        <SideBarNav />
        <div className="mainApp">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/myRecipes" component={MyRecipePage} />
            <Route path="/myRecipes/addRecipe" component={AddRecipe} />
            <Route path="/recipes/:id" component={RecipeDetailPage} />
            <Route path="/searchByName" component={SearchByName} />
            <Route path="/searchByIngredient" component={SearchPage} />
            <Route path="/searchByCategory" component={SearchByCategory} />
            {onlinePages()}
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    offlineMode: state.greenBeanAPI.offlineMode
  };
};

export default connect(mapStateToProps, null)(App);
