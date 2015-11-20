import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {changeCurrentTime, changeSong, toggleIsPlaying} from '../../actions/player';
import Playlist from './Playlist';
import Popover from './Popover';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SongDetails from './SongDetails';
import {CHANGE_TYPES} from '../../constants/SongConstants';
import {formatSeconds} from '../../utils/FormatUtils';
import {offsetLeft} from '../../utils/MouseUtils';
// import {getImageUrl} from '../utils/SongUtils';

@connect(
    state => ({player: state}),
    dispatch => bindActionCreators({changeCurrentTime, changeSong, toggleIsPlaying}, dispatch))
export default class Player extends Component {
  static propTypes = {
    songs: PropTypes.object,
    users: PropTypes.object,
    playingSongId: PropTypes.number,
    player: PropTypes.shape({
      player: PropTypes.shape({
        currentSongIndex: PropTypes.number,
        currentTime: PropTypes.number,
        isPlaying: PropTypes.bool,
        selectedPlaylists: PropTypes.array
      })
    }),
    playlists: PropTypes.object,
    currentTime: PropTypes.number,
    changeCurrentTime: PropTypes.func.isRequired,
    changeSong: PropTypes.func.isRequired,
    toggleIsPlaying: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.changeSong = this.changeSong.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
    this.handleSeekMouseMove = this.handleSeekMouseMove.bind(this);
    this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
    this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this);
    this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
    this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.seek = this.seek.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleRepeat = this.toggleRepeat.bind(this);
    this.toggleShuffle = this.toggleShuffle.bind(this);
    this.state = {
      activePlaylistIndex: null,
      currentTime: 0,
      duration: 0,
      isSeeking: false,
      muted: false,
      repeat: false,
      shuffle: false,
      volume: 0.5,
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
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const isInsideInput = event.target.tagName.toLowerCase().match(/input|textarea/);
    if (isInsideInput) {
      return;
    }

    if (keyCode === 32) {
      event.preventDefault();
      this.togglePlay();
    } else if (keyCode === 106) {
      event.preventDefault();
      this.changeSong(CHANGE_TYPES.PREV);
    } else if (keyCode === 107) {
      event.preventDefault();
      this.changeSong(CHANGE_TYPES.NEXT);
    }
  }

  bindSeekMouseEvents() {
    document.addEventListener('mousemove', this.handleSeekMouseMove);
    document.addEventListener('mouseup', this.handleSeekMouseUp);
  }

  bindVolumeMouseEvents() {
    document.addEventListener('mousemove', this.handleVolumeMouseMove);
    document.addEventListener('mouseup', this.handleVolumeMouseUp);
  }

  changeSong(changeType) {
    this.props.changeSong(changeType);
  }

  changeVolume(event) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    const volume = (event.clientX - offsetLeft(event.currentTarget)) / event.currentTarget.offsetWidth;
    audioElement.volume = volume;
  }

  handleEnded() {
    if (this.state.repeat) {
      ReactDOM.findDOMNode(this.refs.audio).play();
    } else if (this.state.shuffle) {
      this.changeSong(CHANGE_TYPES.SHUFFLE);
    } else {
      this.changeSong(CHANGE_TYPES.NEXT);
    }
  }

  handleLoadedMetadata() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (audioElement) {
      this.setState({
        duration: Math.floor(audioElement.duration)
      });
    }
  }

  handleLoadStart() {
    this.props.changeCurrentTime(0);
    this.setState({
      duration: 0
    });
  }

  handleMouseClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  handlePause() {
    this.props.toggleIsPlaying(false);
  }

  handlePlay() {
    this.props.toggleIsPlaying(true);
  }

  handleSeekMouseDown() {
    this.bindSeekMouseEvents();
    this.setState({
      isSeeking: true,
    });
  }

  handleSeekMouseMove(event) {
    const seekBar = ReactDOM.findDOMNode(this.refs.seekBar);
    const diff = event.clientX - offsetLeft(seekBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / seekBar.offsetWidth;
    percent = percent > 1 ? 1 : percent;

    this.props.changeCurrentTime(Math.floor(percent * this.state.duration));
  }

  handleSeekMouseUp() {
    if (!this.state.isSeeking) {
      return;
    }

    document.removeEventListener('mousemove', this.handleSeekMouseMove);
    document.removeEventListener('mouseup', this.handleSeekMouseUp);
    this.setState({
      isSeeking: false,
    }, function() {
      ReactDOM.findDOMNode(this.refs.audio).currentTime = this.props.player.player.currentTime;
    });
  }

  handleTimeUpdate(event) {
    if (this.state.isSeeking) {
      return;
    }

    const audioElement = event.currentTarget;
    const currentTime = Math.floor(audioElement.currentTime);

    this.props.changeCurrentTime(currentTime);
  }

  handleVolumeChange(event) {
    if (this.state.isSeeking) {
      return;
    }

    this.setState({
      volume: event.currentTarget.volume
    });
  }

  handleVolumeMouseDown() {
    this.bindVolumeMouseEvents();
    this.setState({
      isSeeking: true,
    });
  }

  handleVolumeMouseMove(event) {
    const volumeBar = ReactDOM.findDOMNode(this.refs.volumeBar);
    const diff = event.clientX - offsetLeft(volumeBar);
    const pos = diff < 0 ? 0 : diff;
    let percent = pos / volumeBar.offsetWidth;
    percent = percent > 1 ? 1 : percent;

    this.setState({volume: percent});
    ReactDOM.findDOMNode(this.refs.audio).volume = percent;
  }

  handleVolumeMouseUp() {
    if (!this.state.isSeeking) {
      return;
    }

    document.removeEventListener('mousemove', this.handleVolumeMouseMove);
    document.removeEventListener('mouseup', this.handleVolumeMouseUp);

    this.setState({
      isSeeking: false,
    }, function() {
      ReactDOM.findDOMNode(this.refs.audio).volume = this.state.volume;
    });
  }

  seek(event) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    const currentTime = Math.floor(((event.clientX - offsetLeft(event.currentTarget)) / event.currentTarget.offsetWidth) * this.state.duration);
    this.props.changeCurrentTime(currentTime);
    audioElement.currentTime = currentTime;
  }

  toggleMute() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (this.state.muted) {
      audioElement.muted = false;
    } else {
      audioElement.muted = true;
    }

    this.setState({
      muted: !this.state.muted
    });
  }

  togglePlay() {
    const {
      isPlaying
    } = this.props.player.player;
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  toggleRepeat() {
    this.setState({
      repeat: !this.state.repeat
    });
  }

  toggleShuffle() {
    this.setState({
      shuffle: !this.state.shuffle
    });
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
    const {player, songs} = this.props;
    return (
      <Playlist
                player={player.player}
                songs={songs} />
    );
  }

  renderDurationBar() {
    const {duration} = this.state;
    const {currentTime} = this.props.player.player;
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
    const {currentTime, isPlaying} = this.props.player.player;
    return (
      <div className="player">
        <audio id="audio" src="https://api.soundcloud.com/tracks/191772228/stream?client_id=e582b63d83a5fb2997d1dbf2f62705da" ref="audio"></audio>
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
                <span>{formatSeconds(currentTime)}</span>
                <span className="player-time-divider">/</span>
                <span>{formatSeconds(this.state.duration)}</span>
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
