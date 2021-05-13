import {
  SUBSCRIPTION_LIST_MY_FAIL,
  SUBSCRIPTION_LIST_MY_REQUEST,
  SUBSCRIPTION_LIST_MY_SUCCESS,
  SUBSCRIPTION_LIST_MY_RESET,
  SUBSCRIPTION_CANCEL_REQUEST,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAIL,
} from '../constants/subscriptionConstants';

export const subscriptionListMyReducer = (state = { subscriptions: [] }, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case SUBSCRIPTION_LIST_MY_SUCCESS:
      return {
        loading: false,
        subscriptions: action.payload,
      };
    case SUBSCRIPTION_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case SUBSCRIPTION_LIST_MY_RESET:
      return { subscriptions: [] };
    default:
      return state;
  }
};

export const subscriptionCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_CANCEL_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIPTION_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
