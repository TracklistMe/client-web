import React, {Component, PropTypes} from 'react';

export default class SongDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {title, username} = this.props;
    return (
      <div className="song-card-details">
        <span>
          {title}
        </span><br />
        <span>
          {username}
        </span>
      </div>
    );
  }
}

SongDetails.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
