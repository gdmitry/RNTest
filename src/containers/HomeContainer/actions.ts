import { getPictures } from '../../services/API';
import { PicturesResponse, Picture } from '../../types/api';
import { createAsyncAction, dispatchAsyncAction } from '../../utils';

export const PicturesActions = createAsyncAction<PicturesResponse>(
  'PICTURES__FETCH'
);

export const fetchPictures = (page: number) =>
  dispatchAsyncAction<Picture[], PicturesResponse>(
    PicturesActions,
    () => getPictures(page),
    (data) => ({
      pictures: data,
      page,
    })
  );
