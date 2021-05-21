import { FARM_LIST_REQUEST, FARM_LIST_SUCCESS, FARM_LIST_FAIL } from '../constants/farmConstants';

export const farmListReducer = (state = { farm: [] }, action) => {
  switch (action.type) {
    case FARM_LIST_REQUEST:
      return { loading: true, farm: [] };
    case FARM_LIST_SUCCESS:
      return {
        loading: false,
        farm: action.payload,
      };
    case FARM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
