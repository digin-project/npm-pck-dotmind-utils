// @flow

export type ApiExecutorType = {
  get: (url: string, query?: Object, config?: Object) => Promise<any>,
  put: (url: string, body?: any) => Promise<any>,
  patch: (url: string, body?: any) => Promise<any>,
  del: (url: string) => Promise<any>,
  post: (url: string, body?: Object | string, config?: Object) => Promise<any>,
  upload: (url: string, body?: Object) => Promise<any>,
  setSessionToken: (token?: string) => void,
};

function ApiExecutor(executor: Object): ApiExecutorType {
  function handle(request) {
    return request.then(({ data, _bodyInit }) => (_bodyInit || data));
  }

  /* eslint-disable no-param-reassign */
  function setSessionToken(token?: string) {
    executor.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  /* eslint-enable no-param-reassign */

  function get(url, params, config) {
    return handle(executor.get(url, params, config));
  }

  function put(url, body) {
    return handle(executor.put(url, body));
  }

  function patch(url, body) {
    return handle(executor.patch(url, body));
  }

  function post(url, body, config) {
    return handle(executor.post(url, body, config));
  }

  function del(url) {
    return handle(executor.delete(url));
  }

  function upload(url, body) {
    const headers = {
      'Content-Type': 'application/octet-stream',
    };

    return handle(executor.post(url, body, headers));
  }

  return {
    get,
    put,
    patch,
    post,
    del,
    upload,
    setSessionToken,
  };
}

export default ApiExecutor;
