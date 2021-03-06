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
import InfiniteCarousel from 'react-leaf-carousel';

const HomePage = (props) => {
  useEffect(()=>{
    if(props.recipes.length === 0){
      props.GetTopRecipes()
    }
  })
  return (
    <>
      <HomePageTitle title={"Green Bean Cooking"}/>
      <div className="fitBody">
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
          ]}
          showSides={true}
          sidesOpacity={1}
          sideSize={0.15}
          slidesToScroll={1}
          slidesToShow={4}
          scrollOnDevice={true}
          autoCycle={true}
          animationDuration={500}
          cycleInterval={6000}
        >
            {recipeCategories.map((category, key)=> (
              <CategoryCard key={key} value={category} />
          ))}
        </InfiniteCarousel>
        <div className="homeRecipePadding">
          {props.recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} key={index} />
          ))}
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