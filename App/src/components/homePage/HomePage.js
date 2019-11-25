import React ,{useEffect} from "react";
import RecipeCard from "../shared/RecipeCard";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

const HomePage = (props) => {
  useEffect(()=>{
    if(props.recipes.length === 0){
      props.GetTopTenRecipes()
    }
  })
  return (
    <>
      <HomePageTitle title={"Green Bean Cooking"}/>
      <div className="fitBody">
      <div id="content-area" className="w3-container"></div>
      <div>
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

const mapStateToProps = state => {
  return {
    recipes: state.greenBeanAPI.homePageRecipes
  };
};

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(HomePage);