import React, {Component, PropTypes} from 'react';
import { TracklistJumbotron, Headline, TracklistEntry } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load } from 'redux/modules/tracklist';

@connect(
  store => ({
    tracklist: store.tracklist.data
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
    console.log(this.props.params);
    console.log('i got a props with param id ' + this.props.params.id);
    this.constructor.preload(this.context.store, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('RECEIVING IDS: ');
    console.log(nextProps);
    console.log(parseInt(this.context.store.getState().tracklist.data.id, 10), parseInt(nextProps.params.id, 10));
    if (this.context.store.getState().tracklist &&
        this.context.store.getState().tracklist.data &&
        parseInt(this.context.store.getState().tracklist.data.id, 10) !== parseInt(nextProps.params.id, 10)) {
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
    console.log('trying to render');
    console.log(this.props);
    if (!this.props.tracklist || !this.props.tracklist.Tracks) {
      return (<div>Loading Tracklist</div>);
    }
    return (
      <div>
        <TracklistJumbotron {...this.props} />
          <div className="container-fluid">
          <div className="row margin-bottom">
            <div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Headline title="Tracklist"/>
              </div>
                {this.props.tracklist.Tracks.map((track, index) =>
                 <TracklistEntry key={index} track={track} />
                )}
            </div>
          </div>
          <div className="row darkerrow ">
          </div>
        </div>
      </div>
    );
  }
}
