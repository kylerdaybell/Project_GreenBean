import * as React from "react";
import "../../css/w3.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import {Redirect} from "react-router-dom";
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
      <PageTitle title={"Create Account"}/>
      <div id="content-area" className="w3-container w3-row w3-center w3-display-center fitBody">
      <form className="w3-card" onSubmit={event=>login(event)}>
                <input id="email" type="email" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <input id="validate" type="password" placeholder="verify password"/>
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