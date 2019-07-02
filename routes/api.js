/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var unirest = require('unirest');
require('dotenv').config()


const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
	let price;

  app.route('/api/stock-prices/')
    .get(async function (req, res){

  	await unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${req.query.stock}`)
	.header("X-RapidAPI-Host", process.env.API_HOST)
	.header("X-RapidAPI-Key", process.env.API_KEY)
	.end(function (result) {

	  price = result.body.quoteResponse.result[0].regularMarketPrice;
	});
	if (!price) {
		return res.send('no ticker found')
	} else {
		res.json(price)
	}
   });
    
};


