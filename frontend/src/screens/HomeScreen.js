import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Filter from '../components/Filter';
import { listBundles, listLatestBundles } from '../actions/bundleActions';
import Bundle from '../components/Bundle';
import FeedBack from '../components/FeedBack';
import IntroductionCard from '../components/IntroductionCard';
import feedback from '../feedback.json';
import introduction from '../introduction.json';
import ReactGA from 'react-ga';
import FarmsMap from '../components/FarmsMap';
import FarmStory from '../components/FarmStory';
import PersonalizedRecommendations from '../components/PersonalizedRecommendations';
const { REACT_APP_GUA_ID } = process.env;

const HomeScreen = ({ match }) => {
  const dispatch = useDispatch();

  const bundleList = useSelector((state) => state.bundleList);
  const { loading, error, bundles } = bundleList;

  const bundleLatest = useSelector((state) => state.bundleLatest);
  const { loading: loadingLatest, error: errorLatest, bundles: bundlesListLatest } = bundleLatest;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const keyword = match.params.keyword;

  useEffect(() => {
    ReactGA.initialize(REACT_APP_GUA_ID);
    ReactGA.pageview('/');
  }, []);

  useEffect(() => {
    dispatch(listLatestBundles());
    dispatch(listBundles(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {loading && loadingLatest && <Loader />}
      {error && errorLatest && <Message variant="danger">{error}</Message>}
      {!keyword ? (
        <>
          {userInfo && <Message variant="success">Welcome {userInfo.name}!</Message>}
          <Container className="mb-5">
            <h1>pay less to eat healthy</h1>
            <Row>
              {introduction &&
                introduction.map((card, index) => {
                  return (
                    <Col key={index}>
                      <IntroductionCard
                        image={card.image}
                        heading={card.heading}
                        description={card.description}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
          {userInfo && userInfo.preferences?.diet !== '' ? (
            <PersonalizedRecommendations
              preferences={userInfo.preferences && userInfo.preferences.diet}
            />
          ) : (
            userInfo && (
              <h2 style={{ color: '#808080	' }} className="border text-center">
                Please fill in{' '}
                <Link to="/preferences" style={{ color: '#808080	' }}>
                  preferences
                </Link>{' '}
                to see recommendations
              </h2>
            )
          )}
          {!bundles.length && !bundlesListLatest.length && (
            <Message variant="primary">Nothing found</Message>
          )}

          {userInfo && (
            <>
              <Container className="mb-5">
                <h1>Latest Bundles</h1>
                <Row>
                  {bundlesListLatest.map((bundle) => (
                    <Col key={bundle._id}>
                      <Bundle bundle={bundle} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          )}
          <Container className="mb-5">
            <h1>Our Bundles</h1>

            <Filter keyword={keyword} />
            {loading && <Loader />}
            {bundles.length === 0 && !loading ? (
              <h3>No Bundles Found!</h3>
            ) : (
              <Row>
                {bundles &&
                  bundles.length &&
                  bundles.map((bundle) => (
                    <Col sm={12} md={6} lg={6} xl={3} key={bundle._id}>
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
            )}
          </Container>

          <Container className="mb-5">
            <h1>Loved by thousands of customers</h1>
            <Row>
              {feedback &&
                feedback.map((feed, index) => {
                  return (
                    <Col key={index}>
                      <FeedBack text={feed.feedback} name={feed.name} />
                    </Col>
                  );
                })}
            </Row>
          </Container>
          <Container className="mb-5">
            <h1>Our Farmers</h1>
            <FarmsMap />
            <FarmStory />
          </Container>
        </>
      ) : (
        <Container className="mb-5">
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          {keyword && <h1>Search Results for "{keyword}"</h1>}

          {bundles.length ? (
            <Row>
              {bundles.map((bundle) => (
                <Col key={bundle._id}>
                  <Link to={`/bundles/${bundle._id}`}>
                    <Bundle bundle={bundle} />
                  </Link>
                  <LinkContainer to={`/subscription/${bundle._id}`}>
                    <Button variant="outline-success" size="lg" block>
                      Subscribe
                    </Button>
                  </LinkContainer>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              <Message variant="danger">No results found.</Message>
              <h3>You may also like</h3>
              <Row>
                {bundlesListLatest.map((bundle) => (
                  <Col key={bundle._id}>
                    <Bundle bundle={bundle} />
                    <LinkContainer to={`/bundles/${bundle._id}`}>
                      <Button variant="outline-success" size="lg" block>
                        Subscribe
                      </Button>
                    </LinkContainer>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
