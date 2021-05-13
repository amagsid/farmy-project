import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Table, Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMySubscriptions, cancelSubscription } from '../actions/subscriptionActions';
import { LinkContainer } from 'react-router-bootstrap';
// import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const SubscriptionScreen = ({ match, history }) => {
  // const orderId = match.params.id;
  // const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const { subscriptions, loading, error } = subscriptionListMy;

  const subscriptionCancel = useSelector((state) => state.subscriptionCancel);
  const { success, subscriptionCancelError } = subscriptionCancel;

  const cancelSubscriptionHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(cancelSubscription(id));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listMySubscriptions());
    }
  }, [dispatch, userInfo, history]);

  console.log(subscriptions);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>bundle</th>
            <th>DATE</th>
            <th>size</th>
            <th>QTY</th>
            <th>price</th>
            <th>preference</th>
            <th>address</th>
            <th>cancel</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription._id}>
              <td></td>
              <td>{subscription.bundleName}</td>
              <td>{subscription.date}</td>
              <td>{subscription.size}</td>
              <td>{subscription.qty}</td>
              <td>{subscription.price}</td>

              <td>
                <LinkContainer to={`/home`}>
                  <Button className="btn-sm" variant="light">
                    Preferences
                  </Button>
                </LinkContainer>
              </td>
              <td>{subscription.address}</td>

              <td>
                <LinkContainer to={`/subscriptions`}>
                  <Button
                    className="btn-sm"
                    variant="light"
                    onClick={() => {
                      console.log(subscription._id);
                      cancelSubscriptionHandler(subscription._id);
                    }}
                  >
                    Cancel
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SubscriptionScreen;
