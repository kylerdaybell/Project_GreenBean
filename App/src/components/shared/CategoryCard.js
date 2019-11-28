import React from "react";
import { NavLink } from "react-router-dom";
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
    <div className="w3-third" 
         onClick={() =>
         categorySearch(props.value[0])
        }
    >
      <div className="w3-white cardSpacing card" > 
        <img
          src={props.value[1]}
          alt={props.value[1]}
          style={{ width: "100%", height: "30vh" }} 
        ></img>
        <h2 className="container"><p>{props.value[0]}</p></h2>
    </div>
    </div>
  );
};


export default connect(null,dispatch => 
    bindActionCreators(actionCreators, dispatch)
)(withRouter(CategoryCard));

