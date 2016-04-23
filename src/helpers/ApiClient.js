import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';
const methods = ['get', 'post', 'put', 'patch', 'del'];

const DEV_API_ENDPOINT = 'http://localhost:3000';
const PROD_API_ENDPOINT = '/api';

function formatUrl(path) {
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

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (params) {
          request.query(params);
        }
        if (cookie && cookie.load('loginResult')) {
          console.log('Request With Cookie');
          request.set('Authorization', 'Bearer ' + cookie.load('loginResult').token);
        }
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        if (data) {
          request.send(data);
        }
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
   /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}

export function apiEndPoint() {
  if (__DEVELOPMENT__) {
    return DEV_API_ENDPOINT;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return PROD_API_ENDPOINT;
}
