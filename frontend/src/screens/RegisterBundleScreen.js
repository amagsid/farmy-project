import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ButtonGroup, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listBundlesNewUser } from '../actions/bundleActions';

const RegisterBundleScreen = ({ history, match }) => {
  const [frequency, setFrequency] = useState(1);
  // const [selectedBundle, setSelectedBundle] = useState('');
  const [houseHold, setHouseHold] = useState(1);

  //qty     frq+household
  //qtyTotal  frq+household * price
  const dispatch = useDispatch();

  const bundleSignupNewUser = useSelector((state) => state.bundleSignupNewUser);
  const { loading, error, bundles } = bundleSignupNewUser;
  console.log(bundles);
  // console.log(selectedBundle);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listBundlesNewUser());
    } else {
      history.push(`login`);
    }
  }, [dispatch, userInfo, history]);

  //   const addToCartHandler = () => {
  //     history.push(`/cart/${selectedBundle}?qty=${qty}`);
  //   };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="py-3 my-3">
            <Col md={6}>
              <h2>Select your First Bundle</h2>

              <ButtonGroup vertical className="pr-5">
                {bundles.map((bundle) => (
                  <Link key={bundle._id} to={`/register/bundleplan/${bundle._id}`}>
                    <Button
                      // onClick={(e) => setSelectedBundle(e.target.value)}
                      value={bundle._id}
                      variant="dark"
                      className="rounded my-1"
                    >
                      <Row>
                        <Col md={2}>
                          <Image src={bundle.image} alt={bundle.name} fluid rounded />
                        </Col>
                        <Col md={8}>{bundle.name}</Col>
                        <Col md={2}>${bundle.price}</Col>
                      </Row>
                    </Button>
                  </Link>
                ))}
              </ButtonGroup>
            </Col>
            <Col md={6}>
              <Row className="pl-5 pb-5">
                <h3>Select How many people?</h3>
                <ButtonGroup className="pl-4" onClick={(e) => setHouseHold(e.target.value)}>
                  <Button variant="outline-dark" className="rounded mr-2" value="1">
                    1
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="2">
                    2
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="3">
                    3
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="4">
                    4
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="5">
                    5
                  </Button>
                </ButtonGroup>
              </Row>
              <Row className="pl-5 pb-5">
                <h3>How many Bundles peer week? </h3>
                <ButtonGroup className="pl-4" onClick={(e) => setFrequency(e.target.value)}>
                  <Button variant="outline-dark" className="rounded mr-2" value="1">
                    1
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="2">
                    2
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="3">
                    3
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="4">
                    4
                  </Button>
                  <Button variant="outline-dark" className="rounded mr-2" value="5">
                    5
                  </Button>
                </ButtonGroup>
              </Row>
            </Col>
          </Row>

          {/* <Row>
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

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={bundle.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
           */}
        </>
      )}
    </>
  );
};

export default RegisterBundleScreen;
