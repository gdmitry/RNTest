import * as React from "react";
import { View, ActivityIndicator, Animated } from "react-native";

import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";

import { HiResImage } from "../../types/api";
import styles from "./styles";
import DetailsFooter from "./components/DetailsFooter";

const USENATIVEDRIVER = true;

type Props = {
  imageUrl: string;
  isLoading: boolean;
  shareCallback: () => void;
  applyFilterCallback: () => void;
  pictureDetails: HiResImage;
};

let lastScale = 1;

function DetailView(props: Props) {
  const baseScale = new Animated.Value(1);
  const pinchScale = new Animated.Value(1);
  const scale = Animated.multiply(baseScale, pinchScale);
  const {
    imageUrl,
    isLoading,
    shareCallback,
    applyFilterCallback,
    pictureDetails,
  } = props;

  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: USENATIVEDRIVER }
  );

  const onPinchHandlerStateChange = (
    event: PinchGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.spinner} />
      ) : (
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
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
              resizeMode="contain"
            />
          </Animated.View>
        </PinchGestureHandler>
      )}
      {pictureDetails ? (
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          applyFilterCallback={applyFilterCallback}
        />
      ) : null}
    </View>
  );
}

export default DetailView;
