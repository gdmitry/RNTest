import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailView from '../../screens/DetailView';
import { fetchPictureDetails as fetchPictureDetailsAction } from './actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { selectHiResImage } from './selectors';
import { Share } from 'react-native';
import { RootStackParamList } from '../../App';
import { RootState } from '../../types/store';

export type Props = {
  route: RouteProp<RootStackParamList, 'DetailView'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailView'>;
};

function DetailViewContainer(props: Props) {
  const hiResImage = useSelector((state: RootState) => (imageId: string) =>
    selectHiResImage(state, imageId)
  );
  const isLoading = useSelector(
    (state: RootState) => state.detailViewReducer.isLoading
  );
  const dispatch = useDispatch();
  const fetchPictureDetails = (imageId: string) =>
    dispatch(fetchPictureDetailsAction(imageId));

  const { route } = props;
  const { pictureDetails } = route.params;
  const id = pictureDetails && pictureDetails.id;

  useEffect(() => {
    if (id && !hiResImage(id)) {
      fetchPictureDetails(id);
    }
  }, [id]);

  const fullDetails = id ? hiResImage(id) : undefined;

  if (!fullDetails) {
    return null;
  }
  const imageURL = fullDetails.full_picture;

  const share = async (): Promise<void> => {
    try {
      await Share.share({
        message: imageURL,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const applyFilter = (): void => {
    // TODO: implement apply image filter function
  };

  return (
    <DetailView
      imageUrl={imageURL}
      pictureDetails={fullDetails}
      shareCallback={share}
      isLoading={isLoading}
      applyFilterCallback={applyFilter}
    />
  );
}

export default DetailViewContainer;
