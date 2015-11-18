import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
// import {changeCurrentTime, changeSong, toggleIsPlaying} from '../actions/player';
import Playlist from './Playlist';
import Popover from './Popover';
import SongDetails from './SongDetails';
// import {CHANGE_TYPES} from '../constants/SongConstants';
import {formatSeconds} from '../../utils/FormatUtils';
// import {offsetLeft} from '../utils/MouseUtils';
// import {getImageUrl} from '../utils/SongUtils';

export default class Player extends Component {
  static propTypes = {
    songs: PropTypes.object,
    users: PropTypes.object,
    playingSongId: PropTypes.number,
    player: PropTypes.object,
    playlists: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activePlaylistIndex: null,
      currentTime: 0,
      duration: 0,
      isSeeking: false,
      muted: false,
      repeat: false,
      shuffle: false,
      volume: 1,
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onKeyPress);
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    audioElement.addEventListener('ended', this.handleEnded, false);
    audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
    audioElement.addEventListener('loadstart', this.handleLoadStart, false);
    audioElement.addEventListener('pause', this.handlePause, false);
    audioElement.addEventListener('play', this.handlePlay, false);
    audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
    audioElement.addEventListener('volumechange', this.handleVolumeChange, false);
    audioElement.play();
  }

  renderVolumeIcon() {
    const {muted, volume} = this.state;
    if (muted) {
      return <i className="pictoFont basic-pictomute"></i>;
    }

    if (volume === 0) {
      return <i className="pictoFont basic-pictovolume"></i>;
    } else if (volume === 1) {
      return (
        <div className="player-volume-button-wrap">
          <i className="icon ion-android-volume-up"></i>
          <i className="pictoFont basic-pictovolume"></i>
        </div>
      );
    }
    return (
      <div className="player-volume-button-wrap">
        <i className="icon ion-android-volume-down"></i>
        <i className="pictoFont basic-pictovolume"></i>
      </div>
    );
  }

  renderVolumeBar() {
    const {muted, volume} = this.state;
    const width = muted ? 0 : volume * 100;
    return (
      <div className="player-seek-duration-bar" style={{width: `${width}%`}}>
        <div className="player-seek-handle" onClick={this.handleMouseClick} onMouseDown={this.handleVolumeMouseDown}>
        </div>
      </div>
    );
  }

  renderPlaylist() {
    const {dispatch, player, playlists, songs} = this.props;

    return (
      <Playlist dispatch={dispatch}
                player={player}
                playlists={playlists}
                songs={songs} />
    );
  }

  renderDurationBar() {
    const {duration, currentTime} = this.state;

    if (duration !== 0) {
      const width = currentTime / duration * 100;
      return (
        <div className="player-seek-duration-bar" style={{width: `${width}%`}} >
          <div className="player-seek-handle" onClick={this.handleMouseClick} onMouseDown={this.handleSeekMouseDown}>
          </div>
        </div>
      );
    }
  }

  render() {
    const isPlaying = true;
    return (
      <div className="player">
        <audio id="audio" ref="audio"></audio>
        <div className="container">
          <div className="player-main">
            <div className="player-section player-info">
              <img className="player-image" src={'https://geo-media.beatport.com/image/12299950.jpg'} />
              <SongDetails
                title={'song.title'}
                username={'artists name '} />
            </div>
            <div className="player-section">
              <div
                className="player-button">
                <icon className="basic-pictoskip-back pictoFont"></icon>
              </div>
              <div
                className="player-button"
                onClick={this.togglePlay}>
                <i className={'pictoFont ' + (isPlaying ? 'basic-pictopause' : 'basic-pictoplay')}></i>
              </div>
              <div
                className="player-button">
                <icon className="basic-pictoskip-forward pictoFont"></icon>
              </div>
            </div>
            <div className="player-section player-seek">
              <div className="player-seek-bar-wrap">
                <div className="player-seek-bar" ref="seekBar">
                    {this.renderDurationBar()}
                </div>
              </div>
              <div className="player-time">
                <span>{formatSeconds(123)}</span>
                <span className="player-time-divider">/</span>
                <span>{formatSeconds(155)}</span>
              </div>
            </div>
            <div className="player-section">
              <div
                className={'player-button' + (this.state.repeat ? ' active' : '')}
                onClick={this.toggleRepeat}>
                <icon className="basic-pictorepeat pictoFont"></icon>
              </div>
              <div
                className={'player-button' + (this.state.shuffle ? ' active' : '')}
                onClick={this.toggleShuffle}>
                <icon className="basic-pictoshuffle pictoFont"></icon>
              </div>
              <Popover className={'player-button top-right'}>
                <i className="pictoFont basic-pictoalign-justify"></i>
                {this.renderPlaylist()}
              </Popover>
              <div
                className={'player-button player-volume-button'}
                onClick={this.toggleMute}>
                {this.renderVolumeIcon()}
              </div>
              <div className="player-volume">
                <div className="player-seek-bar-wrap" onClick={this.changeVolume}>
                  <div className="player-seek-bar" ref="volumeBar">
                    {this.renderVolumeBar()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
