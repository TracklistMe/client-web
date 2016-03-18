import React, {Component, PropTypes} from 'react';
import { TracklistJumbotron, Headline, TracklistEntry } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load } from 'redux/modules/track';

@connect(
  store => ({
    tracklist: store.track.data
  }),
  dispatch => bindActionCreators({ load }, dispatch)
)
export default class Tracklist extends Component
{
  static propTypes = {
    params: PropTypes.object,
    tracklist: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    // to do: remove second loading here for client-side navigation
    // to do: remove loading here for server-side rendered page
    this.constructor.preload(this.context.store, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (parseInt(this.context.store.getState().track.data.id, 10) !== parseInt(nextProps.params.id, 10)) {
      this.constructor.preload(this.context.store, nextProps.params.id);
    }
  }

  static preload(store, id) {
    const promises = [];
    // if (!are_settings_loaded(store.getState()))
    // {
    promises.push(store.dispatch(load(id)));
    // }
    return Promise.all(promises);
  }

  render() {
    return (
      <div>
        <TracklistJumbotron {...this.props} />
          <div className="container-fluid">
          <div className="row margin-bottom">
            <div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Headline title="Tracklist"/>
              </div>
                <TracklistEntry active />
                <TracklistEntry />
            </div>
          </div>
          <div className="row darkerrow ">
          </div>
        </div>
      </div>
    );
  }
}
