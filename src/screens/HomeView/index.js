// @flow
import React, { useEffect } from 'react'
import {
  FlatList,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native'
import ListItem from './components/ListItem'
import styles from './styles'
import { Props } from '../../containers/HomeContainer' // use same Props as Main Container

const keyExtractor = (item, page) => item.id.toString() + page

let imageThumbnailStylePortrait = null

function HomeView (props: Props) {
  const { isLoading, page, pictures, onLoadNext, onRefresh, navigation } = props

  const prepareStyles = (): void => {
    const { height, width } = Dimensions.get('window')
    const realWidth = height > width ? width : height
    const portraitImageSize = realWidth / 2 - 10
    imageThumbnailStylePortrait = StyleSheet.flatten({
      width: portraitImageSize,
      height: portraitImageSize,
    })
  }

  const openPicture = (imageId: number): void => {
    navigation.navigate('DetailView', {
      pictureDetails: pictures.find(pic => pic.id === imageId),
    })
  }

  const renderPicture = (item) => {
    const imageURL = item.cropped_picture
    const imageId = item.id

    return <ListItem
      imageUrl={imageURL}
      imageId={imageId}
      imageStyle={imageThumbnailStylePortrait}
      openPicture={openPicture}
    />
  }

  useEffect(() => {
    prepareStyles()
  }, [])

  return (
    <View style={styles.page}>
      <FlatList
        removeClippedSubviews
        refreshing={isLoading}
        initialNumToRender={20}
        data={pictures}
        onRefresh={onRefresh}
        numColumns={2}
        renderItem={({ item }) => renderPicture(item)}
        keyExtractor={(item) => keyExtractor(item, page)}
        onEndReached={onLoadNext}
        onEndThreshold={2}
      />
    </View>
  )
}

export default HomeView
