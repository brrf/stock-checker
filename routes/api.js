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
require('dotenv').config()
var unirest = require('unirest');
const mongoose = require('mongoose');
const stockSchema = require('../schema')

// const stockHandler = require('../stockHandler')


const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
	let result;

  app.route('/api/stock-prices/')
    .get(function (req, res) {
    	const ticker = req.query.stock;
    	let price;
    	const ip = req.ip;
    	const likes = req.query.like ? 1 : 0;

    	


    	unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${ticker}`)
		.header("X-RapidAPI-Host", process.env.API_HOST)
		.header("X-RapidAPI-Key", process.env.API_KEY)
		.end(async function (result) {
			if ( (typeof result.body.quoteResponse.result[0]) == 'undefined') {
				res.send('no stock');
			} else {
				console.log(result.body.quoteResponse.result[0].regularMarketPrice)
    			price = result.body.quoteResponse.result[0].regularMarketPrice

    			// Access mongodb collection by IP
		    	let stocks = mongoose.model(ip, stockSchema);

		    	// check if ticker is in database, if not add to database with likes, if it is then just return it
		    	let stock = await stocks.findOne({stock: ticker});
		    	console.log(stock)
		    	if (!stock) {
		    		stocks.create({
		    			stock: ticker,
		    			likes
		    		})
		    	}
		    	res.json({
		    		stock: ticker,
		    		price,
		    		likes
		    	})



			}
		})


		
   });   
}
