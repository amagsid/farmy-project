import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Form, Container } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import { listBundleDetails, createBundleReview } from '../actions/bundleActions';
import { BUNDLE_CREATE_REVIEW_RESET } from '../constants/bundleConstants';

const BundleDetailsScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [orderFrq, setOrderFrq] = useState(1);
  const [orderPer, setOrderPer] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const arrayOfTime = ['Week', '2 Weeks', 'Month'];
  const dispatch = useDispatch();

  const bundleDetails = useSelector((state) => state.bundleDetails);
  const { loading, error, bundle } = bundleDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bundleReviewCreate = useSelector((state) => state.bundleReviewCreate);
  const {
    success: successBundleReview,
    loading: loadingBundleReview,
    error: errorBundleReview,
  } = bundleReviewCreate;

  useEffect(() => {
    if (successBundleReview) {
      setRating(0);
      setComment('');
    }
    if (!bundle._id || bundle._id !== match.params.id) {
      dispatch(listBundleDetails(match.params.id));
      dispatch({ type: BUNDLE_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, bundle._id, successBundleReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&frq=${orderFrq}&orderper=${orderPer}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBundleReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={bundle.name} />
          <Row>
            <Col md={6}>
              <Image src={bundle.image} alt={bundle.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{bundle.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${bundle.price}</ListGroup.Item>
                <ListGroup.Item>Description: {bundle.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${bundle.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{bundle.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {bundle.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(bundle.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                {bundle.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>How often</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={orderPer}
                          onChange={(e) => setOrderPer(e.target.value)}
                        >
                          {arrayOfTime.map((x, index) => (
                            <option key={index} className="signup-bundle-options" value={x}>
                              {x}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                {bundle.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Times per {orderPer}</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={orderFrq}
                          onChange={(e) => setOrderFrq(e.target.value)}
                        >
                          {[...Array(bundle.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
              </Card>
            </Col>
          </Row>
          <Container>
            <h3>What you will find inside this bundle:</h3>
            <Row>
              {bundle.ingredients?.map(({ origin, price, name, image, _id }) => (
                <Col xs={12} s={4} md={4} lg={3} key={_id}>
                  <Card>
                    <Card.Img variant="top" src={image} alt={name} />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Price: {price}</ListGroup.Item>
                      <ListGroup.Item>Origin: {origin}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default BundleDetailsScreen;
