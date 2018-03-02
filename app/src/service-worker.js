var workbox = require('workbox-sw');

module.exports = function(assets) {
  workbox.precaching.preacheAndRoute(assets.map(a => '/' + a));

  workbox.routing.registerRoute();
};
