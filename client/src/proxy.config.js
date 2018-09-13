"use strict";

/*
 * API proxy configuration.
 * This allows you to proxy HTTP request like `http.get('/api/stuff')` to another server/port.
 * This is especially useful during app development to avoid CORS issues while running a local server.
 * For more details and options, see https://github.com/angular/angular-cli/wiki/stories-proxy
 */
const PROXY_CONFIG = [
  {
    context: "http://localhost:8090",    // Every call beginning by /api
    target: "http://localhost:8090",
    changeOrigin: false, // If you need to access a backend that is not on localhost, you will need to add the changeOrigin option
    secure: false
  }
];

module.exports = PROXY_CONFIG;

// You may experience some delay in the request while debugging :
// https://stackoverflow.com/questions/28762402/ajax-query-weird-delay-between-dns-lookup-and-initial-connection-on-chrome-but-n
