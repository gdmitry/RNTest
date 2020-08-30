import { createAction } from 'redux-act';
import { ErrorResponse } from './types/api';
import { AppDispatch } from './types/store';

export const createAsyncAction = <TSuccess>(type: string) => {
  return {
    request: createAction<void>(`${type}_REQUESTED`),
    success: createAction<TSuccess>(`${type}_SUCCESS`),
    error: createAction<ErrorResponse>(`${type}_ERROR`),
  };
};

export const dispatchAsyncAction = <TSuccess, TTransformed>(
  asyncAction: any,
  callback: () => Promise<TSuccess>,
  transformSuccess?: (payload: TSuccess) => TTransformed
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(asyncAction.request());
    try {
      const response = await callback();
      dispatch(
        asyncAction.success(
          transformSuccess ? transformSuccess(response) : response
        )
      );
    } catch (e) {
      dispatch(asyncAction.error(e));
    }
  };
};