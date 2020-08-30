import { createReducer } from 'redux-act';
import {
  fetchPictureFailed,
  fetchPictureSuccess,
  pictureIsLoading,
} from './actions';
import { HiResImage } from '../../types/api';

const initialState = {
  hiResPictures: [] as HiResImage[],
  isLoading: false,
  errorMessage: '',
};

export type detailViewState = typeof initialState;

const detailViewReducer = createReducer({}, initialState);

detailViewReducer.on(pictureIsLoading, (state) => {
  return {
    ...state,
    isLoading: true,
  };
});

detailViewReducer.on(fetchPictureSuccess, (state, payload) => {
  const { hiResImage } = payload;
  return {
    ...state,
    hiResPictures: [...state.hiResPictures, hiResImage],
    isLoading: false,
  };
});

detailViewReducer.on(fetchPictureFailed, (state, payload) => {
  return {
    ...state,
    ...payload,
    isLoading: false,
  };
});

export default detailViewReducer;
