// @flow
import * as React from 'react'
import DetailView from '../../screens/DetailView'
import { connect } from 'react-redux'
import { fetchPictureDetails } from './actions'
import { selectHiResImage } from './selectors'
import { Share } from 'react-native';

export interface Props {
  navigation: any,
  fetchPictureDetails: Function,
  isLoading: boolean,
  hiResImage: Function,
}
export interface State {
  imageUrl: string,
}

class DetailViewContainer extends React.Component<Props, State> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      height: 50,
      top: 10,
      left: 10,
      right: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: '#FFF',
  }

  componentDidMount () {
    const { navigation, fetchPictureDetails } = this.props
    const { pictureDetails } = navigation.state.params
    if (!this.props.hiResImage(pictureDetails.id)) {
      fetchPictureDetails(pictureDetails.id)
    }
  }

  share = async (imageId: number): void => {
    const fullDetails = this.props.hiResImage(imageId)
    try {
      await Share.share({
        message: fullDetails.full_picture
      });
    } catch (error) {
      alert(error.message);
    }
  }

  applyFilter = (type): void => {
    // TODO: implement apply image filter function
  }

  render () {
    const { pictureDetails } = this.props.navigation.state.params
    const { isLoading, hiResImage } = this.props
    const fullDetails = hiResImage(pictureDetails.id) || {}
    const imageURL = fullDetails.full_picture

    return <DetailView
      imageUrl={imageURL}
      pictureDetails={fullDetails}
      shareCallback={this.share}
      isLoading={isLoading}
      applyFilterCallback={this.applyFilter}
    />
  }
}

function bindAction (dispatch) {
  return {
    fetchPictureDetails: imageId => dispatch(fetchPictureDetails(imageId)),
  }
}

const mapStateToProps = state => ({
  hiResImage: imageId => selectHiResImage(state, imageId),
  isLoading: state.detailViewReducer.isLoading,
})

export default connect(mapStateToProps, bindAction)(DetailViewContainer)
