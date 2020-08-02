import { getPictureDetails } from '../../services/API';
import { AppDispatch } from '../../types/store';
import { HiResImage } from '../../types/api';

export enum ACTION_TYPES {
  PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED',
  PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS',
  FETCH_FAILED = 'FETCH_FAILED',
}

export const pictureIsLoading = () => ({
  type: ACTION_TYPES.PICTURE_DETAILS_FETCH_REQUESTED,
});

export const fetchPictureSuccess = (
  imageId: string,
  hiResImage: HiResImage
) => ({
  type: ACTION_TYPES.PICTURE_DETAILS_FETCH_SUCCESS,
  payload: {
    imageId,
    hiResImage,
  },
});

export const fetchPictureFailed = (errorMessage: string) => ({
  type: ACTION_TYPES.FETCH_FAILED,
  payload: {
    errorMessage,
  },
});

export const fetchPictureDetails = (imageId: string) => async (
  dispatch: AppDispatch
) => {
  dispatch(pictureIsLoading());
  try {
    const hiResImage = await getPictureDetails(imageId);
    dispatch(fetchPictureSuccess(imageId, hiResImage));
  } catch (e) {
    dispatch(fetchPictureFailed(e));
  }
};

export type PictureIsLoading = ReturnType<typeof pictureIsLoading>;
export type FetchPictureSuccess = ReturnType<typeof fetchPictureSuccess>;
export type FetchPictureFailed = ReturnType<typeof fetchPictureFailed>;

export type PictureDetailsAction = PictureIsLoading &
  FetchPictureSuccess &
  FetchPictureFailed;
