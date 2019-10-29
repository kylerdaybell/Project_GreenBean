import React, {useState} from "react";
import PageTitle from "../shared/PageTitle";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService"

const SearchPage = () => {
  const [recipeResults, setRecipeResults] = useState([]);
  const SearchAPI = async ()=>{
    let SearchTerm = document.getElementById("searchBox").value;
    let recipes = await GreenBeanAPIService.SearchForRecipeByName(SearchTerm);
    setRecipeResults(recipes);
  }
  return (
    <>
      <PageTitle title={"Search Page"}/>
      <div id="content-area" className="w3-container">
        <p>this is where the search page goes</p>
      </div>
      <input id="searchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPI()} className="w3-button w3-green ">search</button>
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
