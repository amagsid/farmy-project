import axios from 'axios';
import {
  SUBSCRIPTION_CANCEL_FAIL,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_LIST_MY_FAIL,
  SUBSCRIPTION_LIST_MY_REQUEST,
  SUBSCRIPTION_LIST_MY_SUCCESS,
} from '../constants/subscriptionConstants';
import { logout } from './userActions';

export const listMySubscriptions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subscriptions`, config);

    dispatch({
      type: SUBSCRIPTION_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const cancelSubscription = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CANCEL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subscriptions/${id}`, config);

    dispatch({
      type: SUBSCRIPTION_CANCEL_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_CANCEL_FAIL,
      payload: message,
    });
  }
};

// subscriptionCancel: subscriptionCancelReducer,
