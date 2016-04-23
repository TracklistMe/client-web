import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';

@connect(
  state => ({user: state.auth.user})
  )
export default class AdminTracklist extends Component {
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
        <DocumentMeta title={user.displayName + '\'s tracklist - Tracklist.me'} />
        <h1>{user.displayName } - the tracklist  ***NAME*** </h1>
      </div>
    );
  }
}
