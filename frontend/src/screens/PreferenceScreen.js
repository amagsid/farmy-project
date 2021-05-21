import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import ProdileEditTabs from '../components/ProdileEditTabs';
import FormContainer from '../components/FormContainer';

const PreferenceScreen = ({ history }) => {
  const [diet, setDiet] = useState('');
  const [cookingSkill, setCookingSkill] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const { subscriptions } = subscriptionListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success || !subscriptions) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails('profile'));
      } else {
        setDiet(user.preferences.diet);
        setCookingSkill(user.preferences.cookingSkill);
        setCuisine(user.preferences.cuisine);
        setCookingTime(user.preferences.cookingTime);
      }
    }
  }, [dispatch, history, userInfo, user, success, subscriptions]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({ id: user._id, preferences: { diet, cookingSkill, cuisine, cookingTime } })
    );
  };

  const diets = ['Vegetarian', 'Vegan', 'Mediterranean', 'Low-carb'];
  const cookingSkills = ['Beginner', 'Regular', 'Pro'];
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
  const cookingDurations = [
    'Less than 20 minutes',
    'From 20 to 40 minutes',
    'More than 45 minutes',
  ];

  return (
    <FormContainer>
      <ProdileEditTabs profile subscriptions preferences />

      {success && <Message variant="success">Preferences updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <h6>Choose your favorite diet</h6>
            <Form.Control as="select" onChange={(e) => setDiet(e.target.value)} value={diet || ''}>
              {diets.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>What is your cooking skill level?</h6>
            <Form.Control
              as="select"
              onChange={(e) => setCookingSkill(e.target.value)}
              value={cookingSkill || ''}
            >
              {cookingSkills.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>Choose your favorite cuisine</h6>
            <Form.Control
              as="select"
              onChange={(e) => setCuisine(e.target.value)}
              value={cuisine || ''}
            >
              {cuisines.map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <h6>How much time for cooking?</h6>
            <Form.Control
              as="select"
              onChange={(e) => setCookingTime(e.target.value)}
              value={cookingTime || ''}
            >
              {cookingDurations.map((x, index) => (
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
