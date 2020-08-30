import { createReducer } from 'redux-act';
import {
  fetchListRequested,
  fetchListSuccess,
  fetchListFailed,
} from './actions';
import { Picture } from '../../types/api';

const initialState = {
  pictures: [] as Picture[],
  isLoading: true,
  page: 1,
  errorMessage: '',
};

export type homePageState = typeof initialState;

const homePageReducer = createReducer({}, initialState);

homePageReducer.on(fetchListRequested, (state) => {
  return {
    ...state,
    isLoading: true,
  };
});

homePageReducer.on(fetchListSuccess, (state, payload) => {
  const { page, pictures } = payload;
  return {
    ...state,
    pictures: [...state.pictures, ...pictures],
    isLoading: false,
    page: page + 1,
  };
});

homePageReducer.on(fetchListFailed, (state, payload) => {
  return {
    ...state,
    ...payload,
    isLoading: false,
  };
});

export default homePageReducer;
