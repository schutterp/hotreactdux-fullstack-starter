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

/**
 * Fetch yourself some ingredients for making pizza!
 */
app.get('/ingredients', function (req, res) {
	res.json([
		{
			id: 1,
			name: 'pepperoni',
			unitsAvailable: 10
		},
		{
			id: 2,
			name: 'mushroom',
			unitsAvailable: 5
		},
		{
			id: 3,
			name: 'cheese',
			unitsAvailable: 15
		},
		{
			id: 4,
			name: 'tomatoSauce',
			unitsAvailable: 10
		},
		{
			id: 5,
			name: 'dough',
			unitsAvailable: 10
		}
	]);
});

/**
 * Fetch yourself some ingredients for making pizza!
 */
app.get('/menu', function (req, res) {
	res.json([
	{
		id: 1,
		desc: 'cheese',
		size: 'small',
		price: 5,
		ingredients: {
			dough: 1,
			tomatoSauce: 1,
			cheese: 1
		}
	},
	{
		id: 2,
		desc: 'cheese',
		size: 'large',
		price: 8,
		ingredients: {
			dough: 2,
			tomatoSauce: 2,
			cheese: 2
		}
	},
	{
		id: 3,
		desc: 'pepperoni',
		size: 'small',
		price: 7,
		ingredients: {
			dough: 1,
			tomatoSauce: 1,
			cheese: 1,
			pepperoni: 1
		}
	},
	{
		id: 4,
		desc: 'pepperoni',
		size: 'large',
		price: 10,
		ingredients: {
			dough: 2,
			tomatoSauce: 2,
			cheese: 2,
			pepperoni: 2
		}
	}
	]);
});

var orderId = 0;
/**
 * Create an order. Endpoint returns an id. Fails at random intervals.
 */
app.post('/orders', function (req, res) {
	if (Math.random() * 100 < 20) {
		return res.sendStatus(500);
	}

	res.json({
		id: orderId++
	});
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


var assetServer = new WebpackDevServer(webpack(config), {
	historyApiFallback: {
		index: config.output.publicPath
	},
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
	console.log('API server listening at http://localhost:3000/');
});
