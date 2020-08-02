import { ACTION_TYPES } from './actions';
import { PicturesResponse, ErrorResponse } from '../../types/api';

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: '',
};

export type homePageState = typeof initialState;

const homePageReducer = function (state: homePageState, action: any) {
  switch (action.type) {
    case ACTION_TYPES.PICTURES_FETCH_REQUESTED:
      return { ...state, isLoading: true };
    case ACTION_TYPES.PICTURES_FETCH_SUCCESS: {
      const payload = action.payload as PicturesResponse;
      return {
        ...state,
        ...payload,
        pictures:
          payload.page === 1
            ? payload.pictures
            : [...state.pictures, ...payload.pictures],
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

export default homePageReducer;
