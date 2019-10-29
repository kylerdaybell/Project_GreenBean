import * as React from "react";
import PageTitle from "../shared/PageTitle";
import GreenBeanAPIService from "../../Services/GreenBeanAPIService"

const SearchPage = () => {
  const SearchAPI = ()=>{
    let SearchTerm = document.getElementById("searchBox").value;
    GreenBeanAPIService.SearchForRecipeByName(SearchTerm);
  }
  return (
    <>
      <PageTitle title={"Search Page"}/>
      <div id="content-area" className="w3-container">
        <p>this is where the search page goes</p>
      </div>
      <input id="searchBox" className="w3-input w3-border" type="text" placeholder="search"/>
      <button onClick={()=>SearchAPI()} className="w3-button w3-green ">search</button>
    </>
  );
};

export default SearchPage;
