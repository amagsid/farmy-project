import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import {
  listMySubscriptions,
  cancelSubscription,
  updateSubscription,
} from '../actions/subscriptionActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import UpdateAddressScreen from './UpdateAddressScreen';
import ProdileEditTabs from '../components/ProdileEditTabs';
import FormContainer from '../components/FormContainer';

const ProfileScreen = ({ location, history, match }) => {
  // const subscriptionId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const {
    loading: loadingSubscriptions,
    error: errorSubscriptions,
    subscriptions,
  } = subscriptionListMy;

  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();

  const cancelHandler = (id) => {
    if (window.confirm('Are you sure')) {
      console.log('delete');
      dispatch(cancelSubscription(id));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success || !subscriptions) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMySubscriptions());
      } else {
        setName(user.name);
        setEmail(user.email);
        setAddress(subscriptions[0].shippingAddress.address);
        setCity(subscriptions[0].shippingAddress.city);
        setPostalCode(subscriptions[0].shippingAddress.postalCode);
        setCountry(subscriptions[0].shippingAddress.country);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch(
        updateSubscription({
          id: subscriptions[0]._id,
          address,
          city,
          postalCode,
          country,
        })
      );
    }
  };

  return (
    <FormContainer>
      <ProdileEditTabs profile subscriptions preferences />

      <h2>Hello, {user.name}</h2>
      {message && <Message variant="danger">{message}</Message>}
      {}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {loadingSubscriptions ? (
            <Loader />
          ) : errorSubscriptions ? (
            <Message variant="danger">{errorSubscriptions}</Message>
          ) : (
            <>
              {subscriptions.map(() => (
                <>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      value={city || ''}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter postal code"
                      value={postalCode || ''}
                      required
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter country"
                      value={country || ''}
                      required
                      onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </>
              ))}
            </>
          )}

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
