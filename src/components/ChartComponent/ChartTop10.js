import React, {Component} from 'react';
import CustomButton from '../Buttons/CustomButton';
import ChartTop10Entry from './ChartTop10Entry';

export default class ChartTop10 extends Component {
  render() {
    const chartEntries = [
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12704256.jpg',
        title: 'First entry (original Mix)',
        artists: 'Artist lists 2',
        label: 'label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12632852.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '2 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12810420.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '3 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12718698.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '4 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12722928.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '5 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12699731.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '6 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12686156.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '7 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12665605.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '8 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12713381.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '9 label name',
      },
      {
        cover: 'https://geo-media.beatport.com/image_size_hq/250x250/12723039.jpg',
        title: 'Second entry (original Mix)',
        artists: 'Artist lists 2',
        label: '10 label name',
      }];
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
          <table className="chartTop10Entries">
            {chartEntries.map((entry, index) =>
              <ChartTop10Entry
              key={index}
              position={index + 1}
              cover={entry.cover}
              title={entry.title}
              artists={entry.artists}
              label={entry.label}
              />
            )}
          </table>
      	</div>
      	<div className="bottomLine">
      	</div>
      </div>
    );
  }
}
