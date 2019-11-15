import React from "react";
import "../../css/main.css"; 


const HomePageTitle = (props) => {
  return (
    <>
      <div id="title" className="w3-bar homeTitle">
        <h1>{props.title}</h1>
      </div>
    </>
  );
};

export default HomePageTitle;
