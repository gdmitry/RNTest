import { getPictures } from "../../services/API";
import { ActionWithPayload, ActionWithoutPayload } from "../../types/actions";
import { PicturesResponse, Picture, ErrorResponse } from "../../types/api";
import { AppDispatch } from "../../types/store";

export enum ACTION_TYPES {
  PICTURES_FETCH_REQUESTED = "PICTURES_FETCH_REQUESTED",
  PICTURES_FETCH_SUCCESS = "PICTURES_FETCH_SUCCESS",
  FETCH_FAILED = "FETCH_FAILED",
}

export function listIsLoading(): ActionWithoutPayload {
  return {
    type: ACTION_TYPES.PICTURES_FETCH_REQUESTED,
  };
}

export function fetchListSuccess(
  pictures: Picture[],
  page: number
): ActionWithPayload<PicturesResponse> {
  return {
    type: ACTION_TYPES.PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page,
    },
  };
}

export function fetchListFailed(
  errorMessage: string
): ActionWithPayload<ErrorResponse> {
  return {
    type: ACTION_TYPES.FETCH_FAILED,
    payload: {
      errorMessage,
    },
  };
}

export function fetchPictures(page: number = 1) {
  return async (dispatch: AppDispatch) => {
    dispatch(listIsLoading());
    try {
      const pictures = await getPictures(page);
      dispatch(fetchListSuccess(pictures, page));
    } catch (e) {
      dispatch(fetchListFailed(e));
    }
  };
}

export type ListIsLoading = ReturnType<typeof listIsLoading>;
export type FetchListSuccess = ReturnType<typeof fetchListSuccess>;
export type FetchListFailed = ReturnType<typeof fetchListFailed>;

export type PictureDetailsAction = ListIsLoading &
  FetchListSuccess &
  FetchListFailed;
