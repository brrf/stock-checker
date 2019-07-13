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
const mongoose = require('mongoose');
const stockSchema = require('../schema')
const getPrice = require('../stockHandler')

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
	let result;

  app.route('/api/stock-prices/')
    .get(function (req, res) {
    	const ticker = req.query.stock;
    	const ip = req.ip;
    	const likes = req.query.like ? 1 : 0;

    	// if (Array.isArray(ticker)) {

    	// }
           
        let price = getPrice(ticker);
        price.then( (value) => {
            res.json(value)
        })
        // function storePrice (error, result) {
        //     if (error) {
        //         return 'an error occurred';
        //     } else {
        //         console.log('here 2nd')
        //         return result;
        //     }
        // };

        // async function test () {
        //     let price = await getPrice(storePrice, ticker);
        //     console.log('should not appear yet');
        //     console.log(price);
        // } 

        // test();  


		// Access mongodb collection by IP
    	// let stocks = mongoose.model(ip, stockSchema);

    	// // check if ticker is in database, if not add to database with likes, if it is then just return it
    	// let stock = await stocks.findOne({stock: ticker});

    	// if (!stock) {
    	// 	await stocks.create({
    	// 		stock: ticker,
    	// 		likes
    	// 	}, (err, savedStock) => {
    	// 		if(err) console.log('error in saving new stock');
    	// 		return res.json({
    	// 			stock: savedStock.stock,
    	// 			price,
    	// 			likes: savedStock.likes
    	// 		})
    	// 	})
    	// }
     //    res.send('done')
    	// res.json({
    	// 	stock: stock.stock,
    	// 	price,
    	// 	likes: stock.likes
    	// })		
   });   
}
