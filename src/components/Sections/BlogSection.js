import React, {Component, PropTypes } from 'react';
import MiniHeader from '../MiniHeader/MiniHeader';

export default class BlogSection extends Component {
  render() {
    return (
      <div>
        {this.props.posts.map((post) =>
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <MiniHeader {...post}/>
          </div>
        )}
      </div>
    );
  }
}

BlogSection.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
};
