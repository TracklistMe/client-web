import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {apiEndPoint} from '../../helpers/ApiClient';

@connect(
    state => ({player: state.player}))

export default class Playlist extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    songs: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      shownPlaylistIndex: null
    };
  }

  componentWillUnmount() {
    this.setState({
      shownPlaylistIndex: null
    });
  }

  changeShownPlaylistIndex(index, event) {
    event.preventDefault();
    const {
      player
    } = this.props;
    const {
      selectedPlaylists
    } = player;
    if (index < 0 || index >= selectedPlaylists.length) {
      return;
    }
    this.setState({
      shownPlaylistIndex: index
    });
  }

  handleMouseEnter() {
    document.body.style.overflow = 'hidden';
  }

  handleMouseLeave() {
    document.body.style.overflow = 'auto';
  }

  playSong() {
    // const {dispatch} = this.props;
    // dispatch(playSong(shownPlaylist, index));
    this.setState({
      shownPlaylistIndex: null
    });
  }

  render() {
    const { player } = this.props;
    const { playlist } = player;
    // const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
    // const shownPlaylistIndex = this.state.shownPlaylistIndex !== null ? this.state.shownPlaylistIndex : selectedPlaylists.length - 1;
    // const shownPlaylist = selectedPlaylists[shownPlaylistIndex];
    return (
    <div className="popover-content playlist" onClick = {event => event.stopPropagation()}
      onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}>
      <div className = "playlist-header" >
        <div className="playlist-header-title">
          <h3>PLAYLIST</h3>
        </div>
      </div>
      <hr />
      <div className="playlist-body">
        <ul className="playlist-songs">
          {playlist.map((track, index) =>
            <li key={index} className={'playlist-song' + (index === player.currentSongIndex ? ' active' : '')}>
              <img className="playlist-song-image" src={apiEndPoint() + '/images/' + track.cover}/>
              <div className="playlist-song-title"> {track.title} ({track.version}) </div>
            </li>
          )}
        </ul>
      </div>
      <div className = "playlist-footer" > {playlist.length} Songs </div>
    </div>
    );
  }
}
