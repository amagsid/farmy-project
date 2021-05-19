import { BUNDLES_LIST_REQUEST, BUNDLES_LIST_SUCCESS, BUNDLES_LIST_FAIL } from '../constants/bundlesConstants'
import axios from 'axios';

export const listBundles = () => async (
  dispatch
) => {
  try {
    dispatch({ type: BUNDLES_LIST_REQUEST })

    const { data } = await axios.get('/api/bundles')

    dispatch({
      type: BUNDLES_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BUNDLES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}