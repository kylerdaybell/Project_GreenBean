import React from "react";
import PageTitle from "../shared/PageTitle";
import {saveSettings} from "../../Services/UserSettingsService";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";

const SettingsPage = props => {

  const changeModeText = () => {
    if(props.offlineMode === false){
      return "Go Offline"
    }else{
      return "Go Online"
    }
  }
  const changeMode = async () => {
    props.ChangeMode(props.offlineMode);
    const newSettings = {offlineMode: !props.offlineMode};
    await saveSettings(newSettings);
  }
  return (
    <>
      <PageTitle title="Settings" />
      <div
        id="content-area"
        className="w3-container w3-row w3-center w3-display-center formFit"
      >
        <button className="w3-button w3-green" id="changeModeButton" onClick={()=>changeMode()}>{changeModeText()}</button>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
      offlineMode: state.greenBeanAPI.offlineMode
  };
};

export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(SettingsPage);
