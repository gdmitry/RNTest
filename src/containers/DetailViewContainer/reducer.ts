import { createReducer } from 'redux-act';
import { PictureDetailsActions } from './actions';
import { HiResImage } from '../../types/api';

const initialState = {
  hiResPictures: [] as HiResImage[],
  isLoading: false,
  errorMessage: '',
};

export type detailViewState = typeof initialState;

const detailViewReducer = createReducer({}, initialState);

detailViewReducer.on(PictureDetailsActions.request, (state) => {
  return {
    ...state,
    isLoading: true,
  };
});

detailViewReducer.on(PictureDetailsActions.success, (state, payload) => {
  const { hiResImage } = payload;
  return {
    ...state,
    hiResPictures: [...state.hiResPictures, hiResImage],
    isLoading: false,
  };
});

detailViewReducer.on(PictureDetailsActions.error, (state, payload) => {
  return {
    ...state,
    ...payload,
    isLoading: false,
  };
});

export default detailViewReducer;
