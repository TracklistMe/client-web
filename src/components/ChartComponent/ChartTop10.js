import React, {Component} from 'react';
import CustomButton from '../Buttons/CustomButton';

export default class ChartTop10 extends Component {
  render() {
    return (
      <div>
      	<div className="chart">
          <div className="chartHeader">
            <div className="chartHeadline">
              <div className="title">TOP 10</div>
              <div className="subtitle"> Most download tracks</div>
            </div>
            <CustomButton name="Play All" icon />
          </div>
      	</div>
      	<div className="bottomLine">
      	</div>
      </div>
    );
  }
}
