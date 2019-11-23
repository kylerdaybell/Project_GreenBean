import React, {useEffect} from "react";
import "../../css/w3.css";
import "../../css/form.css";
import PageTitle from "../shared/PageTitle";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
import { withRouter } from "react-router-dom";

const LogoutPage = props => {
  useEffect(()=> {
    if(props.credentials.loggedIn === true){
      props.Logout();
    }
    const timeout = setTimeout(()=>{
      props.history.push("/");
    },3000);
    return () => clearTimeout(timeout);
  });
  return (
    <>
      <PageTitle title={"Successfully Logged Out"} />
      <div
        id="content-area"
        className="w3-container w3-row w3-center w3-display-center formFit"
      >
        Returning Home...
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    credentials: state.greenBeanAPI.credentials
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(LogoutPage));
