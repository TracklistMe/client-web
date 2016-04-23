import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

@connect(
  state => ({user: state.auth.user})
  )
export default class Me extends Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    const {user} = this.props;
    if (!user) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <DocumentMeta title={'Tracklist.me ' + user.displayName} />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        User: {user.displayName}
      </div>
    );
  }
}
