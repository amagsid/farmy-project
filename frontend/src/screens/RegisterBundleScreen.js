import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, ButtonGroup, Image, Button, ListGroup } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBundlesNewUser } from '../actions/bundleActions';
import { SUBSCRIPTION_CREATE_RESET } from '../constants/subscriptionConstants';

const RegisterBundleScreen = ({ history, match }) => {
  const [frequency, setFrequency] = useState(1);
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [houseHold, setHouseHold] = useState(1);

  // This array to map for the options of household and frequency
  const arrayOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dispatch = useDispatch();

  const bundleSignupNewUser = useSelector((state) => state.bundleSignupNewUser);
  const { loading, error, bundles } = bundleSignupNewUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const selectedBundle = bundles.find((o) => o._id === selectedBundleId);

  useEffect(() => {
    if (userInfo) {
      dispatch(listBundlesNewUser());
      dispatch({ type: SUBSCRIPTION_CREATE_RESET });
    } else {
      history.push(`login`);
    }
  }, [dispatch, userInfo, history]);

  const addToCartHandler = () => {
    history.push(`/cart/${selectedBundleId}?qty=${houseHold}&frq=${frequency}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="border-bottom py-3 my-2">
            <Col className="border-right " md={6}>
              <h2>Select your First Bundle</h2>

              <ButtonGroup vertical className="pr-5">
                {bundles.map((bundle) => (
                  <Link
                    value={bundle.id}
                    key={bundle._id}
                    to={`/register/bundleplan/${bundle._id}`}
                  >
                    <Button
                      onClick={(e) => setSelectedBundleId(e.currentTarget.value)}
                      value={bundle._id}
                      variant="dark"
                      className="rounded my-2"
                    >
                      <Row>
                        <Col md={3}>
                          <Image src={bundle.image} alt={bundle.name} fluid rounded />
                        </Col>
                        <Col md={7}>{bundle.name}</Col>
                        <Col md={2}>${bundle.price}</Col>
                      </Row>
                    </Button>
                  </Link>
                ))}
              </ButtonGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="pl-5 pb-5">
                    <h3>Select number of people </h3>
                    <Form.Control
                      as="select"
                      className="signup-bundle-options rounded pl-4"
                      value={houseHold}
                      onChange={(e) => setHouseHold(e.target.value)}
                    >
                      {arrayOfNumbers.map((x, index) => (
                        <option key={index} className="signup-bundle-options" value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="pl-5 pb-5">
                    <h3>How many Bundles per week?</h3>
                    <Form.Control
                      as="select"
                      className="signup-bundle-options rounded pl-4"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                    >
                      {arrayOfNumbers.map((x, index) => (
                        <option key={index} className="signup-bundle-options" value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-center py-3 my-2 ">
            {selectedBundleId !== '' && (
              <Message variant="info">
                You will receive <em className="font-weight-bold">{selectedBundle.name}</em> bundle{' '}
                <em className="font-weight-bold">{frequency}</em> peer week and for{' '}
                <em className="font-weight-bold">{houseHold}</em> people
              </Message>
            )}
          </Row>
          <Row className="border-bottom py-3 my-2">
            <Col className="d-flex align-items-center justify-content-center">
              <Link to={`/cart/${selectedBundleId}?qty=${houseHold}&frq=${frequency}`}>
                <Button
                  onClick={addToCartHandler}
                  variant="dark"
                  className="rounded  signup-bundle-button"
                  disabled={!selectedBundleId}
                >
                  To CArt
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default RegisterBundleScreen;
