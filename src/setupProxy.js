const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://lumen-0q0f.onrender.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '',
            },
        })
    );
    app.use(
        '/flask-api',
        createProxyMiddleware({
            target: 'https://lumen-back-end-flask.onrender.com',
            changeOrigin: true,
            pathRewrite: {
                '^/flask-api': '',
            },
        })
    );
};