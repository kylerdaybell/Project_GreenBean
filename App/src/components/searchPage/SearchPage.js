import React, {useState} from "react";
import PageTitle from "../shared/PageTitle";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService"

const SearchPage = () => {
  const [recipeResults, setRecipeResults] = useState([]);
  const SearchAPIByName = async ()=>{
    let SearchTerm = document.getElementById("nameSearchBox").value;
    let recipes = await GreenBeanAPIService.SearchForRecipeByName(SearchTerm);
    setRecipeResults(recipes);
  }
  const SearchAPIByIngredient = async ()=>{
    let SearchTerm = document.getElementById("ingredientSearchBox").value;
    let recipes = await GreenBeanAPIService.SearchForRecipeByIngredient(SearchTerm);
    setRecipeResults(recipes);
  }
  return (
    <>
      <PageTitle title={"Search Page"}/>
      <div id="content-area" className="w3-container">
      </div>
      <input id="nameSearchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPIByName()} className="w3-button w3-green ">search</button>
      <input id="ingredientSearchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPIByIngredient()} className="w3-button w3-green ">search</button>
      <ul>
        {recipeResults.map((recipe, index) => (
          <div key={index}>
            <li >{recipe.name}</li>
            <li>{recipe.descr}</li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default SearchPage;
