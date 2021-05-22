import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import ReactGA from 'react-ga';
import env from 'react-dotenv';

const Header = () => {
  const dispatch = useDispatch();
  ReactGA.initialize(env.GUA_ID);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    ReactGA.event({
      category: 'header click',
      action: 'click logout',
      label: 'Logout from Header',
    });
  };

  const gaLoginEvent = () => {
    ReactGA.event({
      category: 'header click',
      action: 'click login',
      label: 'Login from Header',
    });
  };

  const gaLogoEvent = () => {
    ReactGA.event({
      category: 'header click',
      action: 'click logo',
      label: 'View Home Page',
    });
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand onClick={gaLogoEvent}>Farmy</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              {userInfo && !userInfo.isAdmin && (
                <LinkContainer to="/plan">
                  <Nav.Link>
                    <i className="fas fa-calendar-alt"></i> Plan
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title="Account" id="account">
                  <NavDropdown.Item disabled>{userInfo.name}</NavDropdown.Item>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link onClick={gaLoginEvent}>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bundlelist">
                    <NavDropdown.Item>Bundles</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/subscriptionlist">
                    <NavDropdown.Item>Subscriptions</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
