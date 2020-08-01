import React, { useEffect } from 'react'
import { Platform, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import HomeView from '../../screens/HomeView'
import { fetchPictures as fetchPicturesAction } from './actions'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface Props {
  navigation: any
}

function HomeContainer (props: Props) {
  const page = useSelector(state => state.homeReducer.page)
  const pictures = useSelector(state => state.homeReducer.pictures)
  const isLoading = useSelector(state => state.homeReducer.isLoading)

  const dispatch = useDispatch()
  const fetchPictures = page => dispatch(fetchPicturesAction(page))
  const passProps = { navigation: props.navigation, fetchPictures, pictures, isLoading }
  const onRefresh = (): void => {
    fetchPictures(1)
  }
  const onLoadNext = (): void => {
    if (!isLoading) {
      fetchPictures(page + 1)
    }
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000')
    } else {
      StatusBar.setBarStyle('light-content')
    }
    onRefresh()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeView {...passProps} onRefresh={onRefresh} onLoadNext={onLoadNext} />
    </SafeAreaView>
  )
}

export default HomeContainer
