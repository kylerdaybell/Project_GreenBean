import * as React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../css/main.css';
import '../../css/sidenav.css';
import { connect } from "react-redux";
import {withRouter} from "react-router-dom"

const SideBarNav = props => {
    const [selectedState, setState] = React.useState("");
    var currentState = window.location.hash.replace('#','');
    if (selectedState !== currentState)
    {
        setState(currentState);
    }
    const LogoutLogin = () => {
        if(props.credentials.loggedIn){
          return (
            <NavItem eventKey="/profile">
                <NavIcon>
                    <i className="fa fa-fw fa-user navbaricon" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
                <NavItem eventKey="/logout">
                    <NavText>
                        Logout
                    </NavText>
                </NavItem>
            </NavItem>

          )
        }
        return (
            <NavItem eventKey="/profile">
                <NavIcon>
                    <i className="fa fa-fw fa-user navbaricon" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Profile
                </NavText>
                <NavItem eventKey="/login">
                    <NavText>
                        Login
                    </NavText>
                </NavItem>
                    <NavItem eventKey="/register">
                    <NavText>
                        Sign Up
                    </NavText>
                </NavItem>
            </NavItem>
        )
      }
    return (
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
                        Search
                    </NavText>
                    <NavItem eventKey="/searchByName" >
                        <NavText>
                            Search by Name
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByIngredient" >
                        <NavText>
                            Search by Ingredients
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByCategory" >
                        <NavText>
                            Search by Category
                        </NavText> 
                    </NavItem>
                </NavItem>
                <NavItem eventKey="/myRecipes">
                    <NavIcon>
                        <i className="fa fa-fw fa-hamburger navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        My Recipes
                    </NavText>
                </NavItem>
                {props.offlineMode ? <></> : LogoutLogin()}
            </SideNav.Nav>
        </SideNav>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        credentials: state.greenBeanAPI.credentials,
        offlineMode: state.greenBeanAPI.offlineMode
    }
  }
  
  
export default connect(
    mapStateToProps,
    null
    )(withRouter(SideBarNav));

