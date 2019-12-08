import * as React from "react";
import "../../css/w3.css";
import "../../css/form.css";
import "../../css/registerForm.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import {Redirect} from "react-router-dom";
const LoginPage = props => {
    if(props.credentials.loggedIn){
        props.history.replace("/");
    }
  
  const register = event => {
    event.preventDefault();
    let email = event.target['email'].value;
    let password = event.target['password'].value;
    let validate = event.target['validate'].value;
    console.log("hit login")
    if(password === validate){
      props.Register(email,password,validate).then(success=>{
        if(success !== true){
          showPopup("snackbar");
        }else{
          showPopup("successSnackbar");
          const timeout = setTimeout(()=>{
            props.history.push("/login");
        },2100);
      return () => clearTimeout(timeout);
    }
    });
    }
    return;
  }  
  const updateEmailMessage = event => {
    document.getElementById("emailMessage").innerHTML = event.target.validationMessage;
   
  }  
  const validatePassword =event => {
    var content = event.target.value;
    var  errors = [];
    console.log(content);
    if (content.length < 6) {
      errors.push("\nAt least 6 characters<br>"); 
    }
    if (content.search(/[a-z]/i) < 0) {
      errors.push("\nAt least one letter.<br>");

    }
    if (content.search(/[0-9]/i) < 0) {
      errors.push("\nAt least one digit.<br>"); 

    }
    if (errors.length > 0) {
      document.getElementById("passwordText").innerHTML = "Your Password must have:<br>" + errors.join('');
    }else
      document.getElementById("passwordText").innerHTML = errors.join('');
     matchPassword()
  }
  const matchPassword = event => {
    var passwordField = document.getElementById("password");
    if(document.getElementById("validate").value != passwordField.value) {
      document.getElementById("validate").setCustomValidity("Passwords Don't Match");
    } else {
      document.getElementById("validate").setCustomValidity('');
    }
  }
  const showPopup = element=>{
    var x = document.getElementById(element);
    x.className = "show"
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      return;
  }
  return (
    <>
      <div id="content-area" className=" w3-animate-top w3-container w3-row w3-center w3-display-center formFit">
      <div className="loginImage">
      <form className="w3-card formInnerPadding registerForm" onSubmit={event=>register(event)}>
                <div id="snackbar">Registration Failed</div>
                <div id="successSnackbar">Registration Successful!</div>
                <h1><div className="formTitle">Create Account</div></h1> 
                <div className="formItem">
                  <input id="email" type="email" placeholder="Email" onChange={event=>updateEmailMessage(event)} required />
                  <div className="requirements" id="emailMessage">Invalid Email</div>
                </div>
                <div className="formItem">
                  <input id="password" type="password" placeholder="Password" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{6,}$"
                   onChange={event=>validatePassword(event)} required/>
                  <div className="requirements" id="passwordText"></div>
                </div>
                <div className="formItem">
                  <input id="validate" type="password" placeholder="Verify Password" onChange={event=>matchPassword(event)} required/>
                  <div className="requirements" id="validateText">Passwords don't match</div>
                </div>
                <button type="submit"className="formButton w3-green">Register</button>
        </form>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
    return {
        credentials: state.credentials
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators,dispatch)
    )(LoginPage);