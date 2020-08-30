import { createReducer } from 'redux-act';
import { PicturesActions } from './actions';
import { Picture } from '../../types/api';

const initialState = {
  pictures: [] as Picture[],
  isLoading: true,
  page: 1,
  errorMessage: '',
};

export type homePageState = typeof initialState;

const homePageReducer = createReducer({}, initialState);

homePageReducer.on(PicturesActions.request, (state) => {
  return {
    ...state,
    isLoading: true,
  };
});

homePageReducer.on(PicturesActions.success, (state, payload) => {
  const { page, pictures } = payload;
  return {
    ...state,
    pictures: [...state.pictures, ...pictures],
    isLoading: false,
    page: page + 1,
  };
});

homePageReducer.on(PicturesActions.error, (state, payload) => {
  return {
    ...state,
    ...payload,
    isLoading: false,
  };
});

export default homePageReducer;
