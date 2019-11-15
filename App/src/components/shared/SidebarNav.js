import * as React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../css/main.css';
const SideBarNav = props => {
    return(
        <>
        
    <div className="sideSpacer">
    <SideNav onSelect={(selected) => {
        }}
    >
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
                <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Search
            </NavText>
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
        </NavItem>
        <NavItem eventKey="AddRecipe">
            <NavIcon>
                <i className="fa fa-fw fa-hamburger" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Add Recipe
            </NavText>
        </NavItem>
        <NavItem eventKey="">
            <NavIcon>
                <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Profile
            </NavText>
        </NavItem>
    </SideNav.Nav>
    </SideNav>
    </div>
    </>
    );
};

export default SideBarNav;