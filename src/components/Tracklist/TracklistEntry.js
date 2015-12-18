import React, {Component, PropTypes } from 'react';

export default class TracklistEntry extends Component {
  render() {
    console.log(this.props.active);
    return (
      <div key={this.props.id} className={'tracklistEntry ' + (this.props.active === true ? 'active' : '')}>
        <div className={'cell cover ' + (this.props.active === true ? 'active' : '')}><img src="http://www.sorstu.ca/wp-content/uploads/artistes/square/adam-beyer.jpg" /></div>
        <div className="cell cell-valign-middle">Title</div>
        <div className="cell cell-valign-middle">Artist</div>
        <div className="cell cell-valign-middle">Label</div>
        <div className="cell cell-valign-middle">Genre</div>
        <div className="cell cell-valign-middle">BPM</div>
        <div className="cell cell-valign-middle">Release Date</div>
        <div className="cell cell-valign-middle">Length</div>
        <div className="cell cell-valign-middle">buy</div>
      </div>
    );
  }
}

TracklistEntry.propTypes = {
  active: PropTypes.bool,
  cover: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
