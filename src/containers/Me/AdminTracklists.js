import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { loadPersonalTracklists } from 'redux/modules/auth';

@connect(
  store => ({
    user: store.auth.user
  }),
  dispatch => bindActionCreators({ loadPersonalTracklists }, dispatch)
)

export default class AdminTracklists extends Component {
  static propTypes = {
    user: PropTypes.shape({
      tracklists: PropTypes.object
    })
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    // to do: remove second loading here for client-side navigation
    // to do: remove loading here for server-side rendered page
    this.constructor.preload(this.context.store);
  }

  static preload(store) {
    const promises = [];
    // if (!are_settings_loaded(store.getState()))
    // {
    promises.push(store.dispatch(loadPersonalTracklists()));
    // }
    return Promise.all(promises);
  }

  render() {
    const {user} = this.props;
    if (!user) {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <DocumentMeta title={user.displayName + '\'s tracklists - Tracklist.me'} />
        <h1><br />{user.displayName } - all the tracklists </h1>
         {user.tracklists.map((tracklist, index) =>
            <span key={index}>{tracklist.title} (total Tracks: {tracklist.Tracks.length})</span>
          )}

      </div>
    );
  }
}
