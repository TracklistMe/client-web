import React, {Component, PropTypes} from 'react';

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
    const { currentSongIndex, selectedPlaylists } = player;
    const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
    const shownPlaylistIndex = this.state.shownPlaylistIndex !== null ? this.state.shownPlaylistIndex : selectedPlaylists.length - 1;
    const shownPlaylist = selectedPlaylists[shownPlaylistIndex];

    const index = 1;
    return (
    <div className="popover-content playlist" onClick = {event => event.stopPropagation()}
      onMouseEnter = {this.handleMouseEnter} onMouseLeave = {this.handleMouseLeave}>
      <div className = "playlist-header" >
        <a className = {'playlist-header-button' + (shownPlaylistIndex === 0 ? ' disabled' : '')}
        href= "#" onClick = {this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex - 1)}>
          <i className = "icon ion-ios-arrow-back"> </i>
        </a>
        <div className="playlist-header-title">
          Title
        </div>
        <a className = {'playlist-header-button' + (shownPlaylistIndex === selectedPlaylists.length - 1 ? ' disabled' : '')}
        href = "#" onClick = {this.changeShownPlaylistIndex.bind(this, shownPlaylistIndex + 1)}>
          <i className="icon ion-ios-arrow-forward"></i>
        </a>
      </div>
      <div className="playlist-body">
        <ul className="playlist-songs">
          <li className = {'playlist-song' + (currentPlaylist === shownPlaylist && index === currentSongIndex ? ' active' : '')}
           key="1" onClick = {this.playSong.bind(this, shownPlaylist, index)}>
            <img className="playlist-song-image" src="http://is1.mzstatic.com/image/thumb/Music69/v4/95/94/35/959435fa-2068-f2bc-6e97-ab8c72008d25/source/1425x1425sr.jpg"/>
            <div className="playlist-song-title">  SONG TITLE </div>
          </li>
        </ul>
      </div>
      <div className = "playlist-footer" > 10 Songs </div>
    </div>
    );
  }
}
