import React, {Component, PropTypes } from 'react';
import MiniHeader from '../MiniHeader/MiniHeader';

export default class StuffPicksSection extends Component {
  render() {
    return (
      <div>
        <div className="col-sub-xs-2 col-sub-sm-2 col-sub-md-2 col-sub-lg-2">
          <section_title_component>
            <title> Stuff Picks</title>
            <more>view more</more>
          </section_title_component>
        </div>
        {this.props.picks.map((pick) =>
          <div className="col-sub-xs-4 col-sub-sm-4 col-sub-md-4 col-sub-lg-4">
            <MiniHeader {...pick}/>
          </div>
        )}
      </div>
    );
  }
}

StuffPicksSection.propTypes = {
  title: PropTypes.string.isRequired,
  picks: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
};
