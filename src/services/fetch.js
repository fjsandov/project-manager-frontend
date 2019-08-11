const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:3000';

function buildUrl(urlPath) {
  return `${baseUrl}/${urlPath}`;
}

class ApiError {
  constructor(errorResponse) {
    this.name = 'ApiError';
    console.log(errorResponse);
    // Object.assign(this, error);
  }
}

function urlFetch(urlPath, options) {
  const opts = options || {};
  opts.headers = opts.headers || {};
  if (!(opts.body instanceof FormData)) {
    opts.headers['Content-Type'] = opts.headers['Content-Type'] || 'application/json';
  }
  return fetch(buildUrl(urlPath), opts);
}

export async function jsonFetch(urlPath, options) {
  const response = await urlFetch(urlPath, options);
  if (response.status === 204) {
    // no content
    return undefined;
  }
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  throw new ApiError(response);
}

export function authJsonFetchBuilder(store, getJwtToken) {
  return async function authJsonFetch(url, options) {
    const opts = options || {};
    opts.headers = opts.headers || {};
    opts.headers.Authorization = opts.headers.Authorization || `Bearer ${getJwtToken(store.getState())}`;
    return jsonFetch(url, opts);
  };
}
