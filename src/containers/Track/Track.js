import React, {Component, PropTypes} from 'react';
import { TrackJumbotron, ReleaseSection, ArtistSection, StuffPicksSection, BlogSection } from 'components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { load } from 'redux/modules/track';

@connect(
  store => ({
    track: store.track.data
  }),
  dispatch => bindActionCreators({ load }, dispatch)
)
export default class Track extends Component
{
  static propTypes = {
    params: PropTypes.object,
    track: PropTypes.object
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    // to do: remove second loading here for client-side navigation
    // to do: remove loading here for server-side rendered page
    this.constructor.preload(this.context.store, this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.context.store.getState().track.data.id !== parseInt(nextProps.params.id, 10)) {
      this.constructor.preload(this.context.store, nextProps.params.id);
    }
  }

  static preload(store, id) {
    const promises = [];
    // if (!are_settings_loaded(store.getState()))
    // {
    promises.push(store.dispatch(load(id)));
    // }
    return Promise.all(promises);
  }

  render() {
    const { track } = this.props;
    return (
      <div>
        <TrackJumbotron {...this.props} />
         <div className="container-fluid">
          <div className="row margin-bottom">
            <ReleaseSection title="Release Session" releases={[
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/150/CS2887488-02A.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2872928-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2880016-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2813227-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2873407-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2873107-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874407-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874207-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874227-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874127-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2864107-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2864027-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2834407-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2834127-02A-BIG.jpg'
              }
            ]}/>
          </div>
          <div className="row darkestrow margin-bottom">
            <ArtistSection title="Featured Artist" artists={[
              {
                artistName: 'Sebastien Tellier',
                artistPicture: 'http://theredlist.com/media/database/muses/icon/iconic_men/2010/sebastien-tellier/058-sebastien-tellier-theredlist.jpg'
              },
              {
                artistName: 'Armin Van Buuren',
                artistPicture: 'http://geo-media.beatport.com/image_size/239x239/12282485.jpg'
              },
              {
                artistName: 'Stefano Noferini',
                artistPicture: 'http://geo-media.beatport.com/image_size/500x500/12286026.jpg'
              },
              {
                artistName: 'Stefano Noferini',
                artistPicture: 'http://geo-media.beatport.com/image_size/500x500/12274017.jpg'
              },
              {
                artistName: 'Ryan Crosson',
                artistPicture: 'http://geo-media.beatport.com/image_size_hq/500x500/9904994.jpg'
              },
              {
                artistName: 'Juliet Fox',
                artistPicture: 'http://geo-media.beatport.com/image_size_hq/500x500/9340803.jpg'
              }
            ]}/>
          </div>
          <div className="row margin-bottom">
            <ReleaseSection title="New Albums" releases={[
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/150/CS2887488-02A.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2872928-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2880016-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2813227-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2873407-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2873107-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874407-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874207-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874227-02A-BIG.jpg'
              }
            ]}/>
          </div>
          {track ? track.cover : ''}
          <div className="row margin-bottom">
            <ReleaseSection title="New Tracks" releases={[
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/150/CS2882488-02A.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2872918-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2810006-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'https://api-media.beatport.com/240x240/sounds/rh5umpgdtksu/1441643011.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2276427-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2810328-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2851397-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874207-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874227-02A-BIG.jpg'
              }
            ]}/>
          </div>
          <div className="row darkestrow margin-bottom">
            <StuffPicksSection title="Staff Picks" picks={[{
              image: 'https://geo-media.beatport.com/image/12299950.jpg',
              author: 'author 1',
              title: 'This is title 1',
            },
            {
              image: 'https://geo-media.beatport.com/image/12299949.jpg',
              author: 'author 1',
              title: 'This is title 1',
            },
            {
              image: 'https://pmcvariety.files.wordpress.com/2015/06/taylor-swift-apple-streaming.jpg?w=670&h=377&crop=1',
              author: 'author 1',
              title: 'This is title 1',
            },
            {
              image: 'http://s3.amazonaws.com/bounceboat-corporate-site-staging-media/2015/07/chromeo-color.jpg',
              author: 'author 2',
              title: 'This is title 2',
            }]}/>
          </div>
          <div className="row margin-bottom">
            <ReleaseSection title="New Compilations" releases={[
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/150/CS2882488-02A.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2872918-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2810006-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'https://api-media.beatport.com/240x240/sounds/rh5umpgdtksu/1441643011.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2276427-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2810328-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2851397-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874207-02A-BIG.jpg'
              },
              {
                title: 'My Release 1',
                label: 'my label name 1',
                cover: 'http://images.junostatic.com/full/CS2874227-02A-BIG.jpg'
              }
            ]}/>
          </div>
          <div className="row darkerrow ">
            <BlogSection posts={[{
              image: 'http://c.fastcompany.net/multisite_files/fastcompany/inline/2014/12/3039748-inline-s-the-10-coolest-office-spaces-of-2014-yelp-jasper-sanidad.jpg',
              author: 'Super Mario',
              title: 'Inside our Office'
            },
            {
              image: 'http://b.fastcompany.net/multisite_files/fastcompany/inline/2014/12/3039748-inline-s-the-10-coolest-office-spaces-of-2014-soundcloud.jpg',
              author: 'Marco Ziccardi, CTO',
              title: 'Inside our Office'
            },
            {
              image: 'http://d.fastcompany.net/multisite_files/fastcompany/inline/2014/12/3039748-inline-s-the-10-coolest-office-spaces-of-2014-home-office-alan-williams-photography.jpg',
              author: 'Test 1234',
              title: 'Inside our Office'
            }]}/>
          </div>
        </div>
      </div>
    );
  }
}
