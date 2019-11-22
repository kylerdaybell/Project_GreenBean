import * as React from "react";
import "../../css/w3.css";
import "../../css/form.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import {Redirect} from "react-router-dom";
import { NavLink } from "react-router-dom";
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
      <div id="content-area" className="w3-container w3-row w3-center w3-display-center fitBody">
      <form className="w3-card" onSubmit={event=>login(event)}>
                <input id="email" type="email" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <button type="submit"className="w3-green">Login</button>
                <NavLink className="w3-button w3-green button" to="/register">
                Create Account
                </NavLink>
                
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