import { ACTION_TYPES } from './actions';
import { HiResImageResponse, ErrorResponse } from '../../types/api';

const initialState = {
  hiResPictures: [],
  isLoading: false,
};

export type detailViewState = typeof initialState;

const detailViewReducer = function (state: detailViewState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.PICTURE_DETAILS_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case ACTION_TYPES.PICTURE_DETAILS_FETCH_SUCCESS: {
      const payload = action.payload as HiResImageResponse;
      return {
        ...state,
        hiResPictures: [...state.hiResPictures, payload.hiResImage],
        isLoading: false,
      };
    }
    case ACTION_TYPES.FETCH_FAILED: {
      const payload = action.payload as ErrorResponse;
      return { ...state, errorMessage: payload.errorMessage, isLoading: false };
    }
    default:
      return state;
  }
};

export default detailViewReducer;
