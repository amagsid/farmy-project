import {
  BUNDLE_LATEST_REQUEST,
  BUNDLE_LATEST_SUCCESS,
  BUNDLE_LATEST_FAIL,
} from '../constants/bundleConstants';

export const bundleLatestReducer = (state = { bundles: [] }, action) => {
  switch (action.type) {
    case BUNDLE_LATEST_REQUEST:
      return { loading: true, bundles: [] };
    case BUNDLE_LATEST_SUCCESS:
      return {
        loading: false,
        bundles: action.payload,
      };
    case BUNDLE_LATEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
