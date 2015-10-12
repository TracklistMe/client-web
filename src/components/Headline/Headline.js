import React, {Component, PropTypes } from 'react';

export default class Headline extends Component {
  render() {
    return (
      <section_title>
        <headline>
          <text>{this.props.title}</text>
            {this.props.playAllVisible &&
              <button_space>
                <play_all_button>
                  <icon className="basic-pictoplay pictoFont"></icon>
                  <text>Play all</text>
                </play_all_button>
              </button_space>
            }
        </headline>
        <hr/>
      </section_title>
    );
  }
}

Headline.propTypes = {
  title: PropTypes.string.isRequired,
  playAllVisible: PropTypes.bool.isRequired
};
