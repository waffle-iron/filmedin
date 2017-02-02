var request = require('request');

module.exports = {
  get: function (id, cb) {
      var key = process.env.API_KEY || '33dc3150798ab371234ed885198bbccdd535b410';
      var options = {
        url: `http://api-public.guidebox.com/v2/movies/${id}?api_key=${key}`
        //headers: exports.headers
      };
      request.get(options, cb);
  },
  search: function (search, cb) {
      var key = process.env.API_KEY || '33dc3150798ab371234ed885198bbccdd535b410'
      var options = {
        url: `http://api-public.guidebox.com/v2/search?type=movie&field=title&query=${search}&api_key=${key}`
        //headers: exports.headers
      };
      request.get(options, cb);
  }
}