import axios from 'axios';
import {
  BUNDLE_LATEST_REQUEST,
  BUNDLE_LATEST_SUCCESS,
  BUNDLE_LATEST_FAIL,
} from '../constants/bundleConstants';

export const listLatestBundles = () => async (dispatch) => {
  try {
    dispatch({ type: BUNDLE_LATEST_REQUEST });

    const { data } = await axios.get(`/api/bundles/latest`);

    dispatch({
      type: BUNDLE_LATEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUNDLE_LATEST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
