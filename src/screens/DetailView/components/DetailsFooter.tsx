import * as React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles from '../styles';
import { HiResImage } from '../../../types/api';
import { Callback } from '../../../types/utils';
// TODO: Solve image import ts error!
// @ts-ignore
import imageFiltersImage from './images/ImageFilters.png';
// @ts-ignore
import shareImage from './images/ShareThis.png';

type Props = {
  shareCallback: Callback;
  applyFilterCallback: Callback;
  pictureDetails: HiResImage;
};

function DetailsFooter(props: Props) {
  const { shareCallback, applyFilterCallback, pictureDetails } = props;
  const { author, camera } = pictureDetails;

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
          <Image
            style={styles.detailViewImage}
            resizeMode="cover"
            // @ts-ignore
            source={imageFiltersImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareCallback}>
          <Image
            style={styles.detailViewImage}
            resizeMode="cover"
            // @ts-ignore
            source={shareImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailsFooter;
