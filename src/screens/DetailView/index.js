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

const USENATIVEDRIVER = true

type Props = {
  imageUrl: string,
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
}
let lastScale = 1

function DetailView (props: Props) {
  const baseScale = new Animated.Value(1)
  const pinchScale = new Animated.Value(1)
  const scale = Animated.multiply(baseScale, pinchScale)
  const {
    imageUrl,
    isLoading,
    shareCallback,
    applyFilterCallback,
    pictureDetails,
  } = props

  onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: this.pinchScale } }],
    { useNativeDriver: USENATIVEDRIVER }
  )

  onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale
      baseScale.setValue(lastScale)
      pinchScale.setValue(1)
    }
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size='large' style={styles.spinner} />
      ) : (
        <PinchGestureHandler
          onGestureEvent={this.onPinchGestureEvent}
          onHandlerStateChange={this.onPinchHandlerStateChange}
        >
          <Animated.View style={styles.wrapper}>
            <Animated.Image
              style={[
                styles.imageStyle,
                {
                  transform: [{ perspective: 200 }, { scale }],
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

export default DetailView
