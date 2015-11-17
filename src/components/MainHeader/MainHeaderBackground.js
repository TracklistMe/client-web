import React, {Component, PropTypes} from 'react';

export default class MainHeaderBackground extends Component {
  static defaultProps = {
    image: '',
    height: 500
  }

  render() {
    const navbarHeight = 60;
    return (
      <main_header_background className="header" style={{height: this.props.height + 'px'}}>
        <img className="header_background" src={this.props.image} />
        <div className="header_shades_holder" style={{height: this.props.height + 'px'}}>
          <div className="header_grey_overlay" style={{height: (this.props.height - navbarHeight) + 'px'}} > </div>
        </div>
      </main_header_background>
    );
  }
}

MainHeaderBackground.propTypes = {
  image: PropTypes.string,
  height: PropTypes.number
};
