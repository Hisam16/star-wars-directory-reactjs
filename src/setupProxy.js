// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // Specify your API route prefix
    createProxyMiddleware({
      target: "https://swapi.dev",
      changeOrigin: true,
    })
  );
};
