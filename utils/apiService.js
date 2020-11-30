const fetch = require('node-fetch');

// Scenario when the server returns a response within 3xx/4xx/5xx code. Catch won't register these cases because communication with the server went well.
const checkResponseStatus = (res, endpoint) => {
  if (!res.ok)
    throw new Error(`Request to server ${endpoint} failed: ${res.status}-${res.statusText}`);
  return res;
};

const post = (endpoint, body, token) => {
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `bearer ${token}`,
    },
  }).then((res) => checkResponseStatus(res, endpoint));
};

module.exports = { post };
