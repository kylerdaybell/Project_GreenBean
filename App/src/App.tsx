import React from "react";
import { Route, Switch } from "react-router";
import Header from "./components/shared/Header";
import Home from "./components/home/Home";
import SearchPage from "./components/searchPage/SearchPage";
import AddRecipe from "./components/addRecipePage/AddRecipe";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/new" component={AddRecipe} />
      </Switch>
    </div>
  );
};

export default App;
