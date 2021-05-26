import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Bundle from '../components/Bundle';
import { Row, Col, Container, Button } from 'react-bootstrap';

const PersonalizedRecommendations = ({ preferences }) => {
  const bundleList = useSelector((state) => state.bundleList);
  const { bundles } = bundleList;
  const filteredBundle = bundles.filter((bundle) => bundle.category.includes(preferences));

  return (
    <>
      <Container className="mb-5">
        <>
          <h1>
            We have chosen these bundles for you according to your{' '}
            <Link to="/preferences">preferences</Link>:
          </h1>
          <Row>
            {filteredBundle.map((bundle) => (
              <Col key={bundle._id}>
                <Link to={`/bundles/${bundle._id}`}>
                  <Bundle bundle={bundle} />
                </Link>
                <LinkContainer to={`/bundles/${bundle._id}`}>
                  <Button variant="outline-success" size="lg" block>
                    Subscribe
                  </Button>
                </LinkContainer>
              </Col>
            ))}
          </Row>
        </>
      </Container>
    </>
  );
};

export default PersonalizedRecommendations;
