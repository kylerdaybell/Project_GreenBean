import * as React from "react";
import "../../css/w3.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import {Redirect} from "react-router-dom";
import SideBarNav from "../shared/SidebarNav.js";
const LoginPage = props => {
    if(props.credentials.loggedIn){
        return <Redirect to="/" />
    }
  
  const login = event => {
    event.preventDefault();
    let email = event.target['email'].value;
    let password = event.target['password'].value;
    props.Login(email,password);
  }    
  return (
    <>
      <PageTitle title={"Login"}/>
      <div id="content-area" className="w3-container w3-row w3-center w3-display-center">
      <form className="w3-card w3-half" onSubmit={event=>login(event)}>
                <input id="email" type="email" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <button type="submit"className="w3-btn w3-green">login</button>
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
    )(LoginPage);