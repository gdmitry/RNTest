import { getPictureDetails } from '../../services/API';
import { HiResImageResponse, HiResImage } from '../../types/api';
import { createAsyncAction, dispatchAsyncAction } from '../../utils';

export const PictureDetailsActions = createAsyncAction<HiResImageResponse>('PICTURE_DETAILS_FETCH');

export const fetchPictureDetails = (imageId: string) =>
  dispatchAsyncAction<HiResImage, HiResImageResponse>(
    PictureDetailsActions,
    () => getPictureDetails(imageId),
    (data) => {
      return {
        hiResImage: data,
        imageId,
      };
    }
  );
