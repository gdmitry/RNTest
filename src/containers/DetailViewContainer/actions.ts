import { getPictureDetails } from '../../services/API';
import { ActionWithPayload, ActionWithoutPayload } from '../../types/actions';
import { AppDispatch } from '../../types/store';
import { HiResImage, ErrorResponse, HiResImageResponse } from '../../types/api';

export enum ACTION_TYPES {
  PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED',
  PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS',
  FETCH_FAILED = 'FETCH_FAILED',
}

export function pictureIsLoading(): ActionWithoutPayload {
  return {
    type: ACTION_TYPES.PICTURE_DETAILS_FETCH_REQUESTED,
  };
}

export function fetchPictureSuccess(
  imageId: string,
  hiResImage: HiResImage
): ActionWithPayload<HiResImageResponse> {
  return {
    type: ACTION_TYPES.PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      imageId,
      hiResImage,
    },
  };
}

export function fetchPictureFailed(
  errorMessage: string
): ActionWithPayload<ErrorResponse> {
  return {
    type: ACTION_TYPES.FETCH_FAILED,
    payload: {
      errorMessage,
    },
  };
}

export function fetchPictureDetails(imageId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(pictureIsLoading());
    try {
      const hiResImage = await getPictureDetails(imageId);
      dispatch(fetchPictureSuccess(imageId, hiResImage));
    } catch (e) {
      dispatch(fetchPictureFailed(e));
    }
  };
}

export type PictureIsLoading = ReturnType<typeof pictureIsLoading>;
export type FetchPictureSuccess = ReturnType<typeof fetchPictureSuccess>;
export type FetchPictureFailed = ReturnType<typeof fetchPictureFailed>;

export type PictureDetailsAction = PictureIsLoading &
  FetchPictureSuccess &
  FetchPictureFailed;
