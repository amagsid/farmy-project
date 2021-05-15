// new home screen Khaled & Fadi
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FarmyBundle from '../components/FarmyBundle';
import FeedBack from '../components/FeedBack';
import IntroductionCard from '../components/IntroductionCard';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBundles } from '../actions/bundlesActions';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import feedback from '../feedback.json';
import introduction from '../introduction.json';

const FarmyHomeScreen = () => {
  const dispatch = useDispatch();
  const bundlesList = useSelector((state) => state.bundlesList);
  const { loading, error, bundles } = bundlesList;

  useEffect(() => {
    dispatch(listBundles());
  }, [dispatch]);

  return (
    <>
      <Container>
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
      <Container>
        <h1>Our Bundles</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            {bundles &&
              bundles.map((bundle) => (
                <Col>
                  <Link to={`/api/bundles/${bundle._id}`}>
                    <FarmyBundle key={bundle._id} name={bundle.name} image={bundle.image} />
                  </Link>
                  <LinkContainer to={`/subscription/${bundle._id}`}>
                    <Button className="mx-5">Subscribe</Button>
                  </LinkContainer>
                </Col>
              ))}
          </Row>
        )}
      </Container>
      <Container>
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
