import React from "react";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
const HomePage = () => {
  return (
    <>
      <HomePageTitle title={"Green Bean Cooking"}/>
      
      <div id="content-area" className="w3-container fitBody">
        <p>Cook what you have, when you want it</p>
      </div>
    </>
  );
};

export default HomePage;