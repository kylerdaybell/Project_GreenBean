import React from "react";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
import SideBarNav from "../shared/SidebarNav";

const HomePage = () => {
  return (
    <>
    
    <div className="sideSpacer">
      <HomePageTitle title={"Green Bean Cooking"}/>
      <SideBarNav/>
      
      <div id="content-area" className="w3-container">
        <p>this is where the home page goes</p>
      </div>
      </div>
    </>
  );
};

export default HomePage;