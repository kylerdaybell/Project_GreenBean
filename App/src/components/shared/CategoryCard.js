import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import { withRouter } from "react-router-dom";
import '../../css/cards.css';

const CategoryCard = props => {
const categorySearch = searchVal => {
    props.SearchForRecipeByCategory(searchVal);
    props.history.push("/searchByCategory");
  };
  return (
        <div className="carouselCard" onClick={() =>
         categorySearch(props.value[0])
        }>
        <img
          src={props.value[1]}
          alt={props.value[1]}
        ></img>
        <h2 className="carouselContainer cardNoWrap">{props.value[0]}</h2>
      </div>
  );
};


export default connect(null,dispatch => 
    bindActionCreators(actionCreators, dispatch)
)(withRouter(CategoryCard));

