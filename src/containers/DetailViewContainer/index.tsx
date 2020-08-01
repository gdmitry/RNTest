import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailView from '../../screens/DetailView'
import { fetchPictureDetails as fetchPictureDetailsAction } from './actions'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { selectHiResImage } from './selectors'
import { Share } from 'react-native'
import { RootStackParamList } from '../../App';
import { RootState } from '../../types/store';

export type Props = {
  route: RouteProp<RootStackParamList, 'DetailView'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailView'>;
}

function DetailViewContainer(props: Props) {
  const hiResImage = useSelector((state: RootState) => (imageId: string) => selectHiResImage(state, imageId))
  const isLoading = useSelector((state: RootState) => state.detailViewReducer.isLoading)
  const dispatch = useDispatch()
  const fetchPictureDetails = (imageId: string) => dispatch(fetchPictureDetailsAction(imageId))

  const { route } = props
  const { pictureDetails } = route.params
  const id = pictureDetails && pictureDetails.id;

  const fullDetails = id ? hiResImage(id) : {};
  const imageURL = fullDetails.full_picture

  useEffect(() => {
    if (id && !hiResImage(id)) {
      fetchPictureDetails(id)
    }
  }, [id])

  const share = async (imageId: string): Promise<void> => {
    const fullDetails = hiResImage(imageId)
    try {
      await Share.share({
        message: fullDetails.full_picture,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const applyFilter = (): void => {
    // TODO: implement apply image filter function
  }

  console.tron(props)

  return (
    <DetailView
      imageUrl={imageURL}
      pictureDetails={fullDetails}
      shareCallback={share}
      isLoading={isLoading}
      applyFilterCallback={applyFilter}
    />
  )
}

export default DetailViewContainer
