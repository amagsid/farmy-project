import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Bundle from '../components/Bundle';
import { Row, Col, Container, Button } from 'react-bootstrap';

const PersonalizedRecommendations = () => {
  const [preferedBundle, setPreferedBundle] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(preferedBundle)

  const userLoggedIn = useSelector((state) => state.userDetails);
  const {success, user} = userLoggedIn;

  const bundleList = useSelector((state) => state.bundleList);
  const { bundles } = bundleList;

  useEffect(() => {
    if (success) {
      const filteredBundle = bundles.filter((bundle) =>
        bundle.category.includes(userInfo.preferences.diet)
      );
      setPreferedBundle(filteredBundle);
    }
  }, [success]);

  return (
    <>
      <Container className="mb-5">
        {success && userInfo ? (
          <>
            <h1>
              We have chosen these bundles for you according to your{' '}
              <Link to="/preferences">preferences</Link>:
            </h1>
            <Row>
              {preferedBundle.map((bundle) => (
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
        ) : (
          <h1>
            <Link to="/preferences">Please update your preferences</Link> to see bundles specially
            selected for you!
          </h1>
        )}
      </Container>
    </>
  );
};

export default PersonalizedRecommendations;
