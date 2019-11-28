import * as React from "react";
import "../../css/w3.css";
import "../../css/form.css"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import {Redirect} from "react-router-dom";
const LoginPage = props => {
    if(props.credentials.loggedIn){
        return <Redirect to="/" />
    }
  
  const login = event => {
    event.preventDefault();
    let email = event.target['email'].value;
    let password = event.target['password'].value;
    let validate = event.target['validate'].value;
    if(password === validate){
      props.Register(email,password,validate);
    }
    props.Login(email,password);
  }    
  return (
    <>
      <div id="content-area" className="w3-container w3-row w3-center w3-display-center formFit">
      <div className="loginImage">
      <form className="w3-card formInnerPadding" onSubmit={event=>login(event)}>
                <h1><div className="formTitle">Create Account</div></h1> 
                <input id="email" type="email" placeholder="Email"/>
                <input id="password" type="password" placeholder="Password"/>
                <input id="validate" type="password" placeholder="Verify Password"/>
                <button type="submit"className="formButton w3-green">Register</button>
        </form>
        </div>
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