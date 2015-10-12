import React, {Component, PropTypes } from 'react';
import ReleaseComponent from '../ReleaseComponent/ReleaseComponent';
import Headline from '../Headline/Headline';

export default class ReleaseSection extends Component {
  render() {
    return (
    <div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Headline title={this.props.title} playAllVisible />
      </div>
        {this.props.releases.map((release) =>
          <div className="col-sub-xs-4 col-sub-sm-4 col-sub-md-3 col-sub-lg-2">
          <ReleaseComponent {...release}/>
          </div>
        )}
    </div>
    );
  }
}

ReleaseSection.propTypes = {
  title: PropTypes.string.isRequired,
  releases: PropTypes.arrayOf(PropTypes.shape({
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired).isRequired
};
