import React, {Component} from 'react';
import MainHeaderBackground from '../MainHeader/MainHeaderBackground';
import MainHeader from '../MainHeader/MainHeader';
import ChartTop10 from '../ChartComponent/ChartTop10';

export default class GenreJumbotron extends Component {
  render() {
    return (
      <div>
        <MainHeaderBackground image={'http://www.thissongslaps.com/wp-content/uploads/2014/12/chemical-brothers.jpg'} />
        <div className="headerContent">
          <div className="row">
            <div className="col-sub-xs-18 col-sub-sm-18 col-sub-md-12 col-sub-lg-12">
              <MainHeader />
            </div>
            <div className="col-sub-xs-9 col-sub-sm-9 col-sub-md-6 col-sub-lg-6">
              <ChartTop10 />
            </div>
          </div>
        </div>
        <div className="mainHeaderSpace"></div>
      </div>
    );
  }
}

GenreJumbotron.propTypes = {
};
