import { createAction } from 'redux-act';
import { getPictureDetails } from '../../services/API';
import { AppDispatch } from '../../types/store';
import { PictureDetailsResponse, ErrorResponse } from '../../types/api';

enum ACTION_TYPES {
  PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED',
  PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS',
  PICTURE_DETAILS_FETCH_FAILED = 'PICTURE_DETAILS_FETCH_FAILED',
}

export const pictureIsLoading = createAction(
  ACTION_TYPES.PICTURE_DETAILS_FETCH_REQUESTED
);
export const fetchPictureSuccess = createAction<PictureDetailsResponse>(
  ACTION_TYPES.PICTURE_DETAILS_FETCH_SUCCESS
);
export const fetchPictureFailed = createAction<ErrorResponse>(
  ACTION_TYPES.PICTURE_DETAILS_FETCH_FAILED
);

export const fetchPictureDetails = (imageId: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(pictureIsLoading());
  try {
    const hiResImage = await getPictureDetails(imageId);
    dispatch(fetchPictureSuccess({ imageId, hiResImage }));
  } catch (e) {
    dispatch(fetchPictureFailed(e));
  }
};
