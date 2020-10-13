// Kintone REST API Request
// kintone.api(pathOrUrl, method, params, opt_callback, opt_errback)

const pathOrUrl = kintone.api.url('/k/v1/record', true);

const method = 'POST';

const body = {
  'app': kintone.app.getId(),
  'record': {
    'Number': {
      'value': count
    }
  }
};

kintone.api(pathOrUrl, method, body,
  function (resp) {
    // Successful API Call
    console.log(resp);
  },
  function (error) {
    // Error
    console.log(error);
  });