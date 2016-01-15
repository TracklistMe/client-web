require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Tracklist Me',
    description: 'Your Next Music Hub.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Tracklist.me',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Tracklist Me',
        'og:description': 'Your new music hub.',
        'twitter:card': 'summary',
        'twitter:site': '@tracklistme',
        'twitter:creator': '@tracklistme',
        'twitter:title': 'Tracklist.me',
        'twitter:description': 'Your Next Music Hub.',
        'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  },

}, environment);
