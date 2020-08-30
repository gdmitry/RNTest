import { createAction } from 'redux-act';
import { getPictures } from '../../services/API';
import { PicturesResponse, ErrorResponse } from '../../types/api';
import { AppDispatch } from '../../types/store';

enum ACTION_TYPES {
  PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED',
  PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS',
  PICTURES_FETCH_FAILED = 'PICTURES_FETCH_FAILED',
}

export const fetchListRequested = createAction(ACTION_TYPES.PICTURES_FETCH_REQUESTED);
export const fetchListSuccess = createAction<PicturesResponse>(ACTION_TYPES.PICTURES_FETCH_SUCCESS);
export const fetchListFailed = createAction<ErrorResponse>(ACTION_TYPES.PICTURES_FETCH_FAILED);

export function fetchPictures(page: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchListRequested());
    try {
      const pictures = await getPictures(page);
      dispatch(fetchListSuccess({ pictures, page }));
    } catch (e) {
      dispatch(fetchListFailed(e));
    }
  };
}
