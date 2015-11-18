import React, {Component, PropTypes} from 'react';
// import MobilePlayer from '../components/MobilePlayer';
import Player from '../../components/Player/Player';

export default class PlayerContainer extends Component {
  static propTypes = {
    playingSongId: PropTypes.number
  }

  render() {
  //  const isMobile = false;
  // if (isMobile) {
  //  return <MobilePlayer {...this.props} />;
  // }
  // if (this.propTypes.playingSongId === null) {
  // return <div/>;
  // }
    return <Player {...this.props} />;
  }
}
