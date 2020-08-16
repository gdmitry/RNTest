import React, { useEffect } from "react";
import {
  FlatList,
  Dimensions,
  StyleSheet,
  View,
  ImageStyle,
  StyleProp,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picture } from "../../types/api";
import ListItem from "./components/ListItem";
import { RootStackParamList, HomeViewKey, DetailViewKey } from "../../App";
import styles from "./styles";

const keyExtractor = (item: Picture, page: number) => item.id.toString() + page;

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof HomeViewKey
>;
export type Props = {
  page: number;
  isLoading: boolean;
  onLoadNext: () => void;
  onRefresh: () => void;
  pictures: Array<Picture>;
  navigation: ProfileScreenNavigationProp;
};

let imageThumbnailStylePortrait: StyleProp<ImageStyle> = null;

function HomeView(props: Props) {
  const {
    isLoading,
    page,
    pictures,
    onLoadNext,
    onRefresh,
    navigation,
  } = props;

  const prepareStyles = (): void => {
    const { height, width } = Dimensions.get("window");
    const realWidth = height > width ? width : height;
    const portraitImageSize = realWidth / 2 - 10;
    imageThumbnailStylePortrait = StyleSheet.flatten({
      width: portraitImageSize,
      height: portraitImageSize,
    });
  };

  const openPicture = (imageId: string): void => {
    navigation.navigate(DetailViewKey, {
      pictureDetails: pictures.find((pic: Picture) => pic.id === imageId),
    });
  };

  const renderPicture = (item: any) => {
    const imageURL = item.cropped_picture;
    const imageId = item.id;

    return (
      <ListItem
        imageUrl={imageURL}
        imageId={imageId}
        imageStyle={imageThumbnailStylePortrait}
        openPicture={openPicture}
      />
    );
  };

  useEffect(() => {
    prepareStyles();
  }, []);

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
        // onEndThreshold={2}
      />
    </View>
  );
}

export default HomeView;
