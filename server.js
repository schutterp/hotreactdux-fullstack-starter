var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

// proxy server
var app = express();
// proxy the request for static assets
app.use('/static', proxy(url.parse('http://localhost:3001/static')));

app.get('/*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


var assetServer = new WebpackDevServer(webpack(config), {
	// historyApiFallback: true
	contentBase: __dirname,
	hot: true,
	quiet: false,
	noInfo: false,
	publicPath: config.output.publicPath,

	stats: { colors: true }
});

assetServer.listen(3001, 'localhost', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Asset server listening at http://localhost:3001/');
});

app.listen(3000, function () {
	console.log('API server listening at http://localhost:3000/ and proxying to assets at 3001');
});
