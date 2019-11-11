import React from "react";
import { Route, Switch } from "react-router";
import Header from "./components/shared/Header";
import HomePage from "./components/homePage/HomePage";
import LoginPage from "./components/loginPage/LoginPage";
import SearchPage from "./components/searchPage/SearchPage";
import AddRecipe from "./components/addRecipePage/AddRecipe";
import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/new" component={AddRecipe} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default App;
