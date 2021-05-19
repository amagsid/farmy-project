// new home screen Khaled & Fadi
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FarmyBundle from '../components/FarmyBundle';
import FeedBack from '../components/FeedBack';
import IntroductionCard from '../components/IntroductionCard';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBundles } from '../actions/bundleActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import feedback from '../feedback.json';
import introduction from '../introduction.json';
import Filter from '../components/Filter';

const FarmyHomeScreen = ({ match }) => {
  const dispatch = useDispatch();
  const bundleList = useSelector((state) => state.bundleList);
  const { loading, error, bundles } = bundleList;

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listBundles());
  }, [dispatch]);

  return (
    <>
      <Container className="mb-5">
        <h1>pay less to eat healthy</h1>
        <Row>
          {introduction &&
            introduction.map((card) => {
              return (
                <Col>
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
      <Container className="mb-5">
        <h1>Our Bundles</h1>
        <Filter keyword={keyword} pageNumber={pageNumber} />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {bundles &&
              bundles.map((bundle) => (
                <Col>
                  <Link to={`/bundles/${bundle._id}`}>
                    <FarmyBundle key={bundle._id} name={bundle.name} image={bundle.image} />
                  </Link>
                  <LinkContainer to={`/subscription/${bundle._id}`}>
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
            feedback.map((feed) => {
              return (
                <Col>
                  <FeedBack text={feed.feedback} name={feed.name} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};
export default FarmyHomeScreen;
