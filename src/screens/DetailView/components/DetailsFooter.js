// @flow
import * as React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native'
import styles from '../styles'
import imageFiltersImage from './images/ImageFilters.png'
import shareImage from './images/ShareThis.png'

type Props = {
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
}

class DetailsFooter extends React.PureComponent<Props> {
  render () {
    const { shareCallback, applyFilterCallback, pictureDetails } = this.props
    if (!pictureDetails) return null
    const { id: imageId, author, camera } = pictureDetails
    return (
      <View style={styles.detailView}>
        <View>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.cameraText}>{camera}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => applyFilterCallback()}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={imageFiltersImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => shareCallback(imageId)}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={shareImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default DetailsFooter
