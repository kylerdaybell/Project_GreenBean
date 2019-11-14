import React from "react";
import "../../css/w3.css";
import "../../css/main.css";
import PageTitle from "../shared/PageTitle";

const HomePage = () => {
  return (
    <>
      <PageTitle title={"Green Bean Cooking"}/>
      <img src="../../../images/homePageBeans.jfif" className="titleImage"></img>
      <div id="content-area" className="w3-container">
        <p>this is where the home page goes</p>
      </div>
    </>
  );
};

export default HomePage;