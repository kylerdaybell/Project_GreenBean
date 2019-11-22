import React ,{useEffect} from "react";
import RecipeCard from "../shared/RecipeCard";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";

const HomePage = (props) => {
  useEffect(()=>{
    props.GetTopTenRecipes(

    )
  })
  return (
    <>
      <HomePageTitle title={"Green Bean Cooking"}/>
      <div className="fitBody">
      <div id="content-area" className="w3-container"></div>
      <div className="w3-row-padding">
        {props.recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
      </div>
      <div id="content-area" className="w3-container fitBody">
      </div>
    </>
  );
};

//export default HomePage;

const mapStateToProps = state => {
  return {
    recipes: state.greenBeanAPI.homePageRecipes
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(HomePage);