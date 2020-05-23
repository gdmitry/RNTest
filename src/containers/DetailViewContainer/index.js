// @flow
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailView from '../../screens/DetailView'
import { fetchPictureDetails as fetchPictureDetailsAction } from './actions'
import { selectHiResImage } from './selectors'
import { Share } from 'react-native'

export interface Props {
  navigation: any,
}

function DetailViewContainer (props: Props) {
  const hiResImage = useSelector(state => (imageId) => selectHiResImage(state, imageId))
  const isLoading = useSelector(state => state.detailViewReducer.isLoading)
  const dispatch = useDispatch()
  const fetchPictureDetails = imageId => dispatch(fetchPictureDetailsAction(imageId))

  const { route } = props
  const { pictureDetails } = route.params
  const fullDetails = hiResImage(pictureDetails.id) || {}
  const imageURL = fullDetails.full_picture

  useEffect(() => {
    if (!hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id)
    }
  }, [])

  const share = async (imageId: number): void => {
    const fullDetails = hiResImage(imageId)
    try {
      await Share.share({
        message: fullDetails.full_picture,
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const applyFilter = (type): void => {
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
