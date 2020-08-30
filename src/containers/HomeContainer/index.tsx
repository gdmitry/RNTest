import React, { useEffect, useCallback } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeView from '../../screens/HomeView';
import { fetchPictures as fetchPicturesAction } from './actions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootState } from '../../types/store';

export interface Props {
  navigation: any;
}

function HomeContainer(props: Props) {
  const page = useSelector((state: RootState) => state.homeReducer.page);
  const pictures = useSelector(
    (state: RootState) => state.homeReducer.pictures
  );
  const isLoading = useSelector(
    (state: RootState) => state.homeReducer.isLoading
  );

  const dispatch = useDispatch();
  const fetchPictures = (p: number) => dispatch(fetchPicturesAction(p));

  const onRefresh = useCallback(() => {
    fetchPictures(1);
  }, []);

  const onLoadNext = useCallback(() => {
    if (!isLoading) {
      fetchPictures(page);
    }
  }, [isLoading, page]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000');
    } else {
      StatusBar.setBarStyle('light-content');
    }
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeView
        navigation={props.navigation}
        pictures={pictures}
        isLoading={isLoading}
        onRefresh={onRefresh}
        onLoadNext={onLoadNext}
        page={page}
      />
    </SafeAreaView>
  );
}

export default HomeContainer;
