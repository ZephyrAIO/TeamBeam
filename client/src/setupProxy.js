const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/api/current_user", "/auth/register", "/auth/login", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};