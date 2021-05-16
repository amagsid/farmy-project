import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { updateSubscription } from '../actions/subscriptionActions';

const UpdateAddressScreen = ({ match, history }) => {
  const subscriptionId = match.params.id;
  const [message, setMessage] = useState(null);

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy || {});
  const {
    loading: loadingSubscriptions,
    error: errorSubscriptions,
    subscriptions,
  } = subscriptionListMy;

  const subscriptionUpdate = useSelector((state) => state.subscriptionUpdate);
  const { success, subscription: updatedSubscription } = subscriptionUpdate;

  const subscription = subscriptions.find((sub) => {
    return sub._id === subscriptionId;
  });

  const { shippingAddress } = subscription;

  const [address, setAddress] = useState(shippingAddress.address || {});
  const [city, setCity] = useState(shippingAddress.city || {});
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || {});
  const [country, setCountry] = useState(shippingAddress.country || {});

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (success) {
  //     setAddress(shippingAddress.adress);
  //     setCity(shippingAddress.city);
  //     setPostalCode(shippingAddress.postalCode);
  //     setCountry(shippingAddress.country);
  //   }
  // }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSubscription({ subscriptionId, address, city, postalCode, country }));
    history.push('/profile');
  };

  return (
    <FormContainer>
      <h1>Edit Your Address</h1>
      {loadingSubscriptions ? (
        <Loader />
      ) : errorSubscriptions ? (
        <Message variant="danger">{errorSubscriptions}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address || ''}
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

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default UpdateAddressScreen;
