import * as React from "react";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../../css/main.css';
import { Redirect } from 'react-router';

const SideBarNav = props => {
    const [path, setPath] = React.useState("");
    //const [currPath, setCurrPath] = React.useState("");
    if (path !== "") {
        return (
        <>
        <SideNav
            onSelect={(selected) => {
                if (selected !== path)
                    setPath(selected);
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected='/'>
                <NavItem eventKey="/">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey='/searchMain'>
                    <NavIcon>
                        <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Search
                    </NavText>
                    <NavItem eventKey="/searchByName">
                        <NavText>
                            Search by Name
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/search">
                        <NavText>
                            Search by Ingredients
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByCategory">
                        <NavText>
                            Search by Category
                        </NavText> 
                    </NavItem>
                    <NavItem eventKey="/searchByEmail">
                        <NavText>
                            My Recipes
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="/new">
                    <NavIcon>
                        <i className="fa fa-fw fa-hamburger" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Add Recipe
            </NavText>
                </NavItem>
                <NavItem eventKey="/profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
            </NavText>
                    <NavItem eventKey="">
                        <NavText>
                            Profile settings
                </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavText>
                            Logout
                </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
        <Redirect to={path} />
        </>)
    }
    return (
        <SideNav
            onSelect={(selected) => {
                if (selected !== path)
                    setPath(selected);
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected='/'>
                <NavItem eventKey="/">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey='/searchMain'>
                    <NavIcon>
                        <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Search
                    </NavText>
                    <NavItem eventKey="/searchByName">
                        <NavText>
                            Search by Name
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/search">
                        <NavText>
                            Search by Ingredients
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="/searchByCategory">
                        <NavText>
                            Search by Category
                        </NavText> 
                    </NavItem>
                    <NavItem eventKey="/searchByEmail">
                        <NavText>
                            My Recipes
                        </NavText>
                    </NavItem>
                </NavItem>
                <NavItem eventKey="/new">
                    <NavIcon>
                        <i className="fa fa-fw fa-hamburger" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Add Recipe
            </NavText>
                </NavItem>
                <NavItem eventKey="/profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Profile
            </NavText>
                    <NavItem eventKey="">
                        <NavText>
                            Profile settings
                </NavText>
                    </NavItem>
                    <NavItem eventKey="">
                        <NavText>
                            Logout
                </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

export default SideBarNav;