import React, {useState} from "react";
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
import SettingsPage from "./components/settings/SettingsPage";
import { connect } from "react-redux";
import "./css/main.css";
import "./App.css";
import WindowFrame from "./components/shared/WindowFrame";
import {loadSettings} from "./Services/UserSettingsService";
import { bindActionCreators } from "redux";
import * as actionCreators from "./store/actions/actions";

const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  if(isLoading){
    const settings = loadSettings();
    console.log(settings)
    props.ChangeMode(!settings["offlineMode"])
    setIsLoading(false);
  }
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
            <Route exact path="/settings" component={SettingsPage} />
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

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(App);
