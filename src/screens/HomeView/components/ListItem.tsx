import React, { useCallback } from "react";
import { TouchableOpacity, Image, ImageStyle, StyleProp } from "react-native";
import styles from "../styles";

export type Props = {
  imageUrl: string;
  imageId: string;
  openPicture: (imageId: string) => void;
  imageStyle: StyleProp<ImageStyle>;
};

function ListItem(props: Props) {
  const { imageUrl, imageId, openPicture, imageStyle } = props;
  const onPressHandler = useCallback(() => {
    openPicture(imageId);
  }, [imageId]);

  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.item}>
      <Image style={imageStyle} resizeMode="cover" source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
}

export default ListItem;
