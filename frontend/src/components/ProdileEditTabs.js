import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const ProdileEditTabs = ({ profile, subscriptions, preferences }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {profile ? (
          <LinkContainer to="/profile">
            <Nav.Link>Account Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link>Profile</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {subscriptions ? (
          <LinkContainer to="/subscriptions">
            <Nav.Link className={'active'}>Subscriptions</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link>Subscriptions</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {preferences ? (
          <LinkContainer to="/preferences">
            <Nav.Link>Preferences</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link>Preferences</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default ProdileEditTabs;
