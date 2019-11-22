import React from 'react'
import "../../css/w3.css";
import "../../css/form.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import {Redirect} from "react-router-dom";

const LogoutPage = props => {
    if(props.credentials.loggedIn === false){
        return <Redirect to="/login" />
    }
    const logout = event => {
        event.preventDefault();
        props.Logout();
      } 
  return (
    <>
      <PageTitle title={"Logout"} />
      <div
        id="content-area"
        className="w3-container w3-row w3-center w3-display-center formFit"
      >
        <form className="w3-card w3-half" onSubmit={event => logout(event)}>
          <button type="submit" className="w3-btn w3-green formButton">
            logout
          </button>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = state => {
    return {
        credentials: state.greenBeanAPI.credentials
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators,dispatch)
    )(LogoutPage);
