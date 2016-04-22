import React, {Component, PropTypes } from 'react';
import {apiEndPoint} from '../../helpers/ApiClient';
import {formatSeconds} from '../../utils/FormatUtils';

export default class TracklistEntry extends Component {

  render() {
    if (!this.props.track) {
      return (
        <div></div>
      );
    }
    return (
      <div key={this.props.id} className={'tracklistEntry ' + (this.props.active === true ? 'active' : '')}>
        <div className={'cell cover ' + (this.props.active === true ? 'active' : '')}><img src={apiEndPoint() + '/images/' + this.props.track.cover} /></div>
        {this.props.track.isLive &&
          <div className="cell cell-valign-middle">
            <span>13:10</span>

            arrow down
            <span>23:14</span>
          </div>
        }
        <div className="cell cell-valign-middle">{this.props.track.title} <span>({this.props.track.version})</span></div>
        <div className="cell cell-valign-middle">
          {this.props.track.Producer.map((producer, index) =>
            <span key={index}>{producer.displayName}</span>
          )}
        </div>
        <div className="cell cell-valign-middle">{this.props.track.Releases[0] && this.props.track.Releases[0].Labels && this.props.track.Releases[0].Labels[0].displayName}</div>
        <div className="cell cell-valign-middle hidden-xs text-center">{this.props.track.Genres && this.props.track.Genres[0].name}</div>
        <div className="cell cell-valign-middle hidden-xs hidden-sm text-center">{this.props.track.bpm}</div>
        <div className="cell cell-valign-middle hidden-xs hidden-sm">{this.props.track.Releases[0] && this.props.track.Releases[0].title}</div>
        <div className="cell cell-valign-middle hidden-xs hidden-sm">{formatSeconds(this.props.track.lengthInSeconds)}</div>
      </div>
    );
  }
}

TracklistEntry.propTypes = {
  active: PropTypes.bool,
  cover: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  track: PropTypes.object
};
