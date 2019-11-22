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
    var currentState = window.location.hash.replace('#','')
    if (selectedState !== currentState)
    {
        setState(currentState);
    }
    const LogoutLogin = () => {
        if(props.credentials.loggedIn){
          return (
            <NavItem eventKey="/logout">
                <NavText>
                    Logout
                </NavText>
            </NavItem>

          )
        }
        return (
            <NavItem eventKey="/login">
                <NavText>
                    Login
                </NavText>
            </NavItem>
        )
      }
    return (
        
        <SideNav
            onSelect={(selected) => {
                props.history.push(selected);
            }}
            onToggle={(selected) => {
                var d = document.getElementsByClassName("spacerBar").style;
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
                    <NavItem eventKey="/searchByEmail" >
                        <NavText>
                            My Recipes
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="/new">
                    <NavIcon>
                        <i className="fa fa-fw fa-hamburger navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Add Recipe
                    </NavText>
                </NavItem>
                <NavItem eventKey="/profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user navbaricon" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                    {/* <NavItem eventKey="">
                        <NavText>
                            Profile settings
                        </NavText>
                    </NavItem> */}
                    {LogoutLogin()}
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};


const mapStateToProps = state => {
    return {
        credentials: state.greenBeanAPI.credentials
    }
  }
  
  
export default connect(
    mapStateToProps,
    null
    )(withRouter(SideBarNav));

