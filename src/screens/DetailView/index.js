// @flow
import * as React from 'react'
import {
  View,
  ActivityIndicator,
  Animated,
} from 'react-native'

import {
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler'

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'

const USE_NATIVE_DRIVER = true

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
}

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {
  _baseScale = new Animated.Value(1);
  _pinchScale = new Animated.Value(1);
  _scale = Animated.multiply(this._baseScale, this._pinchScale);
  _lastScale = 1;

  _onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this._pinchScale } }],
    { useNativeDriver: USE_NATIVE_DRIVER }
  );

  _onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale
      this._baseScale.setValue(this._lastScale)
      this._pinchScale.setValue(1)
    }
  };

  render () {
    const {
      imageUrl,
      isLoading,
      shareCallback,
      applyFilterCallback,
      pictureDetails,
    } = this.props

    return (
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size='large' style={styles.spinner} />
        ) : (
          <PinchGestureHandler
            onGestureEvent={this._onPinchGestureEvent}
            onHandlerStateChange={this._onPinchHandlerStateChange}
          >
            <Animated.View style={styles.wrapper}>
              <Animated.Image
                style={[
                  styles.imageStyle,
                  {
                    transform: [{ perspective: 200 }, { scale: this._scale }],
                  },
                ]}
                source={{ uri: imageUrl }}
                resizeMode='contain'
              />
            </Animated.View>
          </PinchGestureHandler>
        )}
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          applyFilterCallback={applyFilterCallback}
        />
      </View>
    )
  }
}

export default DetailView
