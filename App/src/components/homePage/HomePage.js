import React ,{useEffect} from "react";
import RecipeCard from "../shared/RecipeCard";
import "../../css/w3.css";
import "../../css/main.css";
import HomePageTitle from "../shared/HomePageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import recipeCategories from "../addRecipePage/recipeCategories";
import CategoryCard from "../shared/CategoryCard";

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
        <div>
          {recipeCategories.map((category, key)=> (
            <CategoryCard key={key} value={category} />
          ))}
        </div>
      </div>
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