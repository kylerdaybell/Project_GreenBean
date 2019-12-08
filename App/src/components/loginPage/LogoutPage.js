import React, {useEffect} from "react";
import "../../css/w3.css";
import "../../css/form.css";
import "../../css/logoutPopup.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/onlineActions";
import { withRouter } from "react-router-dom";

const LogoutPage = props => {
   useEffect(()=> {
     if(props.credentials.loggedIn === true){
       props.Logout();
     }
     const timeout = setTimeout(()=>{
       props.history.replace("/");
     },3000);
     return () => clearTimeout(timeout);
   });
  return (
    <>
    <div className="logoutOverlay">
      <div className="logoutAlertBody"> 
        <div><h3>Logging Out, Please Wait...</h3></div>
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    credentials: state.credentials
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(LogoutPage));
