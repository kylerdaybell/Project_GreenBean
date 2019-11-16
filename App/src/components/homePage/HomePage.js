import React from "react";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
import SideBarNav from "../shared/SidebarNav";
const HomePage = () => {
  return (
    <>
      <HomePageTitle title={"Green Bean Cooking"}/>
      
      <div id="content-area" className="w3-container fitBody">
        <p>this is where the home page goes</p>
      </div>
    </>
  );
};

export default HomePage;