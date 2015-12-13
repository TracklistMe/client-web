import React, {Component, PropTypes} from 'react';
import BuyFromTop10Chart from '../Buttons/BuyFromTop10Chart';

export default class ChartTop10Entry extends Component {
  render() {
    return (
      <tr className="chart_top10_entry">
        <td className="position"> {this.props.position} </td>
        <td className="coverHolder">
          <img className="cover_image" src={this.props.cover} />
        </td>
        <td className="descriptionHolder">
          <div className="entryTitle">{this.props.title}</div>
          <div className="entryArtist"> {this.props.artists} </div>
          <div className="entryLabel"> {this.props.label} </div>
        </td>
        <td className="buyButton">
          <BuyFromTop10Chart name="$0.99" icon />
        </td>
      </tr>
    );
  }
}

ChartTop10Entry.propTypes = {
  position: PropTypes.number.isRequired,
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
