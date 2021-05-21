import ProdileEditTabs from '../components/ProdileEditTabs';

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMySubscriptions, updateSubscription } from '../actions/subscriptionActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';

const PreferenceScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [subId, setSubId] = useState('');

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

  const timeInHours = new Date().getHours();

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
        setAddress();
        setCity();
        setPostalCode();
        setCountry();
      }
    }
  }, [dispatch, history, userInfo, user, success, subscriptions, subId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch(
        updateSubscription({
          subId,
          address,
          city,
          postalCode,
          country,
        })
      );
    }
  };

  const diets = ['vegetarian', 'vegan', 'mediterranean', 'low-carb'];
  const cookingSkills = ['beginner', 'regular', 'pro'];
  const cuisines = [
    'Greek',
    'Japanese',
    'Caribbean',
    'Vietnamese',
    'Mexican',
    'Thai',
    'Korean',
    'Indian',
    'Italian',
  ];
  const cookingTime = ['less than 20 minutes', 'from 20 to 40 minutes', 'more than 45 minutes'];

  return (
    <FormContainer>
      <ProdileEditTabs profile subscriptions preferences />

      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <h6>Diet </h6>
            <Form.Control as="select" onChange={(e) => setSubId(e.target.value)}>
              <option>choose your favorite diet</option>
              {diets.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>Cooking Skills </h6>
            <Form.Control as="select" onChange={(e) => setSubId(e.target.value)}>
              <option>What are your cooking skills?</option>
              {cookingSkills.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>cuisines </h6>
            <Form.Control as="select" onChange={(e) => setSubId(e.target.value)}>
              <option>choose your favorite diet</option>
              {cuisines.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>cooking time </h6>
            <Form.Control as="select" onChange={(e) => setSubId(e.target.value)}>
              <option>cooking time</option>
              {cookingTime.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default PreferenceScreen;
