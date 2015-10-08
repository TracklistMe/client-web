import React, {Component, PropTypes} from 'react';

export default class MainHeaderBackground extends Component {
  render() {
    return (
      <main_header_background className="header">
        <img className="header_background" src={this.props.image} />
        <div className="header_shades_holder">
          <div className="header_grey_overlay"> </div>
        </div>
      </main_header_background>
    );
  }
}

MainHeaderBackground.propTypes = {
  image: PropTypes.string
};
