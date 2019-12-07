import * as React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../css/main.css';
import '../../css/sidenav.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../store/actions/actions";
import {withRouter} from "react-router-dom"
import { isReferenced } from "@babel/types";

const SideBarNav = props => {
    const [selectedState, setState] = React.useState("");
    var currentState = window.location.hash.replace('#','');
    if (selectedState !== currentState)
    {
        setState(currentState);
    }
    const logoutLogin = () => {
        if(props.credentials.loggedIn){
          return (
                <NavItem eventKey="/logout">
                    <NavText>
                        Logout
                        <i className="fa fa-fw fa-sign-out-alt navbaricon" style={{"paddingLeft": "10px"}}/>
                    </NavText>
                </NavItem>

          )
        }
        return (
                <NavItem eventKey="/login">
                    <NavText >
                        Login
                        <i className="fa fa-fw fa-sign-in-alt navbaricon" style={{"paddingLeft": "10px"}}/>
                    </NavText>
                </NavItem>
        )
      }
    const register = () => {
        if(props.credentials.loggedIn === false){
            return (
                <NavItem eventKey="/register">
                    <NavText>
                        Sign Up
                        <i className="fa fa-fw fa-user-plus navbaricon" style={{"paddingLeft": "10px"}}/>
                    </NavText>
                </NavItem>
            )
        }
    }
    const changeOnlineIcon = () => {
        if (props.offlineMode === false){
            document.documentElement.style.setProperty('--onlineVisibility', "hidden");
            document.documentElement.style.setProperty('--onlineColor', "blue");
        }else{
            
            document.documentElement.style.setProperty('--onlineVisibility', "visible");
            document.documentElement.style.setProperty('--onlineColor', "black");
        }
    }
    return (
        <>
        <div  >
        <SideNav
            onSelect={(selected) => {
                props.history.push(selected);
            }}
            onToggle={(expanded) => {
                document.documentElement.style.setProperty('--sideNavLeftMargin', expanded ? 240 + "px" : 64 + "px")
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav selected={selectedState}>
                <NavItem eventKey="/">
                    <NavIcon>
                        <i className="fa fa-fw fa-home navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home 
                    </NavText>
                </NavItem>
                <NavItem eventKey='/searchMain' >
                    <NavIcon>
                        <i className="fa fa-fw fa-search navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Search by
                    </NavText>
                    <NavItem eventKey="/searchByName" >
                        <NavText>
                            Name
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByIngredient" >
                        <NavText>
                            Ingredients
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByCategory" >
                        <NavText>
                            Category
                        </NavText> 
                    </NavItem>
                </NavItem>

                <NavItem eventKey="/profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                    {props.offlineMode === false ? (logoutLogin()) :<></>}
                    {props.offlineMode === false ? (register()) :<></>}
                    <NavItem eventKey="/myRecipes/addRecipe">
                        <NavText>
                            Add Recipe
                            <i className="fa fa-fw fa-mortar-pestle navbaricon" style={{"paddingLeft": "10px"}} />
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/settings">
                        <NavText>
                            Settings
                            <i className="fa fa-fw fa-cog navbaricon" style={{"paddingLeft": "10px"}} />
                        </NavText>
                    </NavItem>
                </NavItem>

            </SideNav.Nav>
        </SideNav>
        </div>
        {changeOnlineIcon()}
        <div className="onlineOfflineBox" onClick={()=>props.ChangeMode(props.offlineMode)} >
        <div className="onlineIndicator fa fa-2x fa-rss"></div>
        <div className="offlineIndicator fa fa-times-circle"></div>
        </div>
        </>
    );
};


const mapStateToProps = state => {
    return {
        credentials: state.credentials,
        offlineMode: state.greenBeanAPI.offlineMode
    }
  }
  
export default connect(mapStateToProps, dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(withRouter(SideBarNav));

