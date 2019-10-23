import * as React from "react";
import "../../css/w3.css";
import PageTitle from "../shared/PageTitle";

const Home = () => {
  return (
    <>
      <PageTitle title={"Welcome Home"}/>
      <div id="content-area" className="w3-container">
        <p>this is where the home page goes</p>
      </div>
    </>
  );
};

export default Home;