import React, {Component, PropTypes} from 'react';
import moment from 'moment';

export default class TimeDuration extends Component {
  static propTypes = {
    length: PropTypes.number,
    format: PropTypes.string
  };

  static defaultProps = {
    length: 0,
    format: 'h:mm:ss'
  }
  render() {
    const time = moment.duration(100, 'seconds').format(this.props.format);
    return (<span>{time}</span>);
  }
}
