import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ButtonGroup, Image, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBundlesNewUser } from '../actions/bundleActions';

const RegisterBundleScreen = ({ history }) => {
  const [frequency, setFrequency] = useState(1);
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [houseHold, setHouseHold] = useState(1);

  // // const newArray = [];
  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2);
  // };

  const dispatch = useDispatch();

  const bundleSignupNewUser = useSelector((state) => state.bundleSignupNewUser);
  const { loading, error, bundles } = bundleSignupNewUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listBundlesNewUser());
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
              <Row className="pl-5 pb-5">
                <h3>Select How many people?</h3>
                <ButtonGroup className="pl-4" onClick={(e) => setHouseHold(e.target.value)}>
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
                  <Button variant="outline-dark" className="rounded mr-2" value="6">
                    6
                  </Button>
                </ButtonGroup>
              </Row>
              <Row className="pl-5 pb-5">
                <h3>How many Bundles peer week? </h3>
                <ButtonGroup className="pl-4" onClick={(e) => setFrequency(e.target.value)}>
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
                  <Button variant="outline-dark" className="rounded mr-2" value="6">
                    6
                  </Button>
                </ButtonGroup>
              </Row>
            </Col>
          </Row>
          <Row className="border-bottom py-3 my-2 ">
            <Col md="8">
              You will receive your bundle {frequency} peer week and for {houseHold} people
            </Col>
            <Col md="4">
              <Link to={`/cart/${selectedBundleId}?qty=${houseHold}&frq=${frequency}`}>
                <Button onClick={addToCartHandler} variant="dark" className="rounded my-2">
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
