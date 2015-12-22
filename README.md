 
=======
# Based on React Redux Universal Hot Example

[![build status](https://img.shields.io/travis/erikras/react-redux-universal-hot-example/master.svg?style=flat-square)](https://travis-ci.org/erikras/react-redux-universal-hot-example)
[![Dependency Status](https://david-dm.org/erikras/react-redux-universal-hot-example.svg?style=flat-square)](https://david-dm.org/erikras/react-redux-universal-hot-example)
[![devDependency Status](https://david-dm.org/erikras/react-redux-universal-hot-example/dev-status.svg?style=flat-square)](https://david-dm.org/erikras/react-redux-universal-hot-example#info=devDependencies)
[![react-redux-universal channel on discord](https://img.shields.io/badge/discord-react--redux--universal%40reactiflux-brightgreen.svg?style=flat-square)](https://discord.gg/0ZcbPKXt5bZZb1Ko)
[![Demo on Heroku](https://img.shields.io/badge/demo-heroku-brightgreen.svg?style=flat-square)](https://react-redux.herokuapp.com)
[![PayPal donate button](https://img.shields.io/badge/donate-paypal-brightgreen.svg?style=flat-square)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E2LK57ZQ9YRMN)

---
 
## About

This is the client repo for the Tracklist.me Store.


## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>H</kbd> Toggle DevTools Dock
- <kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the 
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.

## Building and Running Production Server

```bash
npm run build
npm run start
```