import React, {Component, PropTypes} from 'react';

export default class TimeDuration extends Component {
  static propTypes = {
    length: PropTypes.number,
    format: PropTypes.string
  };

  static defaultProps = {
    length: 0,
    format: 'hh:mm:ss'
  }
  render() {
    const hours = Math.floor(this.props.length / (60 * 60));
    const reminderFromHours = this.props.length % (60 * 60);
    const minutes = Math.floor(reminderFromHours / 60);

    const reminderFromMinutes = reminderFromHours % 60;
    const seconds = Math.ceil(reminderFromMinutes);

      // add leading zero and start concatenating the string
    let timeString = (seconds < 10) ? ('0' + seconds) : seconds;
    if (minutes > 0) {
      timeString = ((minutes < 10) ? ('0' + minutes) : minutes) + ':' + timeString;
    }
    if (hours > 0) {
      timeString = hours + ':' + timeString;
    }
    return (<span>{timeString}</span>);
  }
}
