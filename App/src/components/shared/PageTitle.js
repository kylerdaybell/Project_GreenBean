import React from "react";


const PageTitle = (props) => {
  return (
    <>
      <div id="title" className="w3-container w3-green">
        <h1>{props.title}</h1>
      </div>
    </>
  );
};

export default PageTitle;
