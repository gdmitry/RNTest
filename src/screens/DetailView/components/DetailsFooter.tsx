import * as React from 'react'
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native'
import styles from '../styles'
import { HiResImage } from '../../../types/api';
 import imageFiltersImage from './images/ImageFilters.png'
 import shareImage from './images/ShareThis.png'
 
 type Props = {
   shareCallback: Function,
  applyFilterCallback: () => void,
  pictureDetails: HiResImage,
 }
 
 function DetailsFooter (props: Props) {
   const { shareCallback, applyFilterCallback, pictureDetails } = props
   const { id: imageId, author, camera } = pictureDetails
   
  const share = React.useCallback(() => shareCallback(imageId), [imageId]);


  return (
    <View style={styles.detailView}>
      <View>
        <Text style={styles.authorText}>{author}</Text>
        <Text style={styles.cameraText}>{camera}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={applyFilterCallback}
        >
          <Image style={styles.detailViewImage}
            resizeMode='cover'
            source={imageFiltersImage} />
        </TouchableOpacity>
        <TouchableOpacity
         onPress={share}>
          <Image style={styles.detailViewImage}
            resizeMode='cover'
            source={shareImage} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailsFooter
