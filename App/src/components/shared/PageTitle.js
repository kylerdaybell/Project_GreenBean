import React from "react";
import "../../css/main.css"


const PageTitle = (props) => {
  return (
    <>
      <div id="title" className="w3-container w3-text-white titleBars">
        <h1>{props.title}</h1>
      </div>
    </>
  );
};

export default PageTitle;
