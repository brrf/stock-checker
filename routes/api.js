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
    	const like = req.query.like || false;

    	console.log(like)

    	unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${ticker}`)
		.header("X-RapidAPI-Host", process.env.API_HOST)
		.header("X-RapidAPI-Key", process.env.API_KEY)
		.end(function (result) {
			if ( (typeof result.body.quoteResponse.result[0]) == 'undefined') {
				res.send('no stock');
			} else {
				console.log(result.body.quoteResponse.result[0].regularMarketPrice)
    			res.json(result.body.quoteResponse.result[0].regularMarketPrice)
			}
		})
   });   
}
