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
      {/* <input id="nameSearchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPIByName()} className="w3-button w3-green ">search</button> */}
      <input id="ingredientSearchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPIByIngredient()} className="w3-button w3-green ">search</button>
      <div className="w3-row-padding">
        {recipeResults.map((recipe, index) => (
          <div className="w3-card w3-third" key={index}>
            <img src={recipe.recipe.picture} alt="recipe picture" style={{"width": "100%"}}></img>
            <h2 className="w3-container">{recipe.recipe.name}</h2>
            <p className="w3-text-green w3-container">Percent Match {recipe.percentmatch}</p>
            <p className="w3-container">Description{recipe.recipe.descr}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
