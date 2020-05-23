// @flow
import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  Image,
} from 'react-native'
import styles from '../styles'

type Props = {
  imageUrl: string,
  imageId: number,
  openPicture: Function,
  imageStyle: Object,
}

function ListItem (props: Props) {
  const { imageUrl, imageId, openPicture, imageStyle } = props

  return (
    <TouchableOpacity
      onPress={() => openPicture(imageId)}
      style={styles.item}>
      <Image style={imageStyle}
        resizeMode='cover'
        source={{uri: imageUrl}} />
    </TouchableOpacity>
  )
}

export default ListItem
