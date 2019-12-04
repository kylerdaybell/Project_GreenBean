import * as React from "react";
import "../../css/w3.css";
import "../../css/form.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import { NavLink } from "react-router-dom";
const LoginPage = props => {
    if(props.credentials.loggedIn){
        props.history.goBack();
    }
  
  const login = event => {
    event.preventDefault();
    let email = event.target['email'].value;
    let password = event.target['password'].value;
    props.Login(email,password).then(val=>{
      console.log(val)
      if(val.result === "Failure"){
      showPopup("snackbar")
    };
    return;
    });
  }    
  const showPopup = (element)=>{
    var x = document.getElementById(element);
    var sideBarLeft = getComputedStyle(x).getPropertyValue("--sideNavLeftMargin")

    var sideBarLeftSize = (sideBarLeft.includes("64px") ? 32 : 120)
    x.style.left = window.innerWidth/2 + sideBarLeftSize + "px";

    x.className = "show"
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
      return;
  }
  return (
    <>
      <div id="content-area" className="w3-container w3-row w3-center w3-display-center formFit">
        <div id="formBoxArea"className="loginImage w3-card">
          <div id="snackbar">Login Failed</div>
            <form className="formInnerPadding" onSubmit={event=>login(event)}>
              <h1><div className="formTitle">Login</div></h1>  
              <div className="formItem">
                <input id="email" type="email" placeholder="Email"/>
              </div>
              <div className="formItem">
                <input id="password" type="password" placeholder="Password"/>
              </div>
              <button type="submit"className="w3-green">Login</button>
              <NavLink className="w3-button w3-green formButton" to="/register">
              Create Account
              </NavLink>                
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