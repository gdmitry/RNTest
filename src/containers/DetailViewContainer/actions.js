// @flow
import { getPictureDetails } from '../../services/API'
import { FETCH_FAILED } from '../HomeContainer/actions'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (imageId: number, hiResImage: Object): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: {
      imageId,
      hiResImage,
    },
  }
}

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    type: FETCH_FAILED,
    payload: {
      errorMessage,
    },
  }
}

export function fetchPictureDetails (imageId: number) {
  return async dispatch => {
    dispatch(pictureIsLoading())
    try {
      const hiResImage = await getPictureDetails(imageId)
      dispatch(fetchPictureSuccess(imageId, hiResImage))
    } catch (e) {
      dispatch(fetchPictureFailed(e))
    }
  }
}
