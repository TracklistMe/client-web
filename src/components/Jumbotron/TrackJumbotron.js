import React, {Component, PropTypes } from 'react';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import ArtistComponent from '../Artist/ArtistComponent';
import CustomButton from '../Buttons/CustomButton';
import { Waveform, d3 } from 'react-d3-components/dist/react-d3-components';

export default class TrackJumbotron extends Component {
  static propTypes = {
    track: PropTypes.shape({
      Genres: PropTypes.array
    })
  }
  render() {
    const data = [{
      label: 'somethingA',
      values: []
    }];
    /* Absolute values of a sin waveform. We do expect only values within [0,1] */
    for (let index = 0; index < 720; index++) {
      data[0].values.push({x: '' + index, y: Math.abs(Math.sin(index / 18) + Math.cos(index / 10))});
    }
    const {track} = this.props; // eslint-disable-line no-shadow
    if (!track || !track.Genres) {
      return (<div> not loaded</div>);
    }
    return (
      <div className="trackJumbotron">
        <MainHeaderBackground image={track ? track.cover : ''} />
        <div className="headerContent">
          <div className="row trackJumbotronContainer">
            <div className="hidden-xs hidden-sm col-sub-xs-5 col-sub-sm-6 col-sub-md-5 col-sub-lg-4 overflowHidden">
              <img className="cover" src={track ? track.cover : ''} />
            </div>
            <div className="col-sub-xs-18 col-sub-sm-18 col-sub-md-13 col-sub-lg-14">
              <div className="row">
                <div className="col-lg-6 text-left trackDescriptionSpace">
                  <div className="genreContainer">
                      {track.Genres.map((genre, index) =>
                        <CustomButton key={index} {...genre} />
                      )}
                  </div>
                  <div>
                      {track.Producer.map((producer, index) =>
                       <ArtistComponent key={index} {...producer}/>
                      )}
                  </div>
                </div>
                <div className="col-lg-6 text-right">
                  sharing Stats
                </div>
                <div className="col-lg-12 titleContainer">
                      <h1>{track ? track.title + ' (' + track.version + ')' : ''} </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-left">
                     <Waveform
                       data={data}
                       width={1400}
                       height={200}
                       colorScale={ d3.scale.linear()
                                    .domain([0, 1400])
                                    .range(['#eb1785', '#ff7b16'])} />
                </div>
                <div className="col-xs-6 col-lg-3 text-left">
                  Released: <strong>20/12/2014</strong>
                </div>
                <div className="col-xs-6 col-lg-3 text-left">
                  BPM: <strong>134</strong>
                </div>
                <div className="col-xs-6 col-lg-3 text-left">
                  Key: <strong>Amin</strong>
                </div>
                <div className="col-xs-6 col-lg-3 text-left">
                  Label: <strong>Label Woop Woop</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
