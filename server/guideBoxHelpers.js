var request = require('request');
var apiKey = require('./env/config');

// exports.headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
// };
module.exports = {
  get: function (id, cb) {
      var options = {
        url: `http://api-public.guidebox.com/v2/movies/${id}?api_key=${apiKey.key}`
        //headers: exports.headers
      };
      request.get(options, cb);
  }
}