import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';
const methods = ['get', 'post', 'put', 'patch', 'del'];

const DEV_API_ENDPOINT = 'http://localhost:3000';
const PROD_API_ENDPOINT = '/api';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (cookie && cookie.load('loginResult')) {
              console.log('adding a bearer token ---');
              console.log(cookie.load('loginResult').token);
              console.log('---');
              request.set('Authorization', 'Bearer ' + cookie.load('loginResult').token);
            }
            if (__SERVER__) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, {body, status} = {}) =>
              err ? reject({
                error: body || err,
                status
              }) : resolve(body));
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (__SERVER__) {
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + config.apiPort + adjustedPath;
    }
    if (__DEVELOPMENT__) {
      return DEV_API_ENDPOINT + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return PROD_API_ENDPOINT + adjustedPath;
  }
}

const ApiClient = _ApiClient;

export function apiEndPoint() {
  if (__DEVELOPMENT__) {
    return DEV_API_ENDPOINT;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return PROD_API_ENDPOINT;
}

export default ApiClient;
