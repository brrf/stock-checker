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

let price, price1, price2, stock, stock1, stock2

  app.route('/api/stock-prices/')
    .get(async function (req, res) {
    	const ticker = req.query.stock;
    	const ip = req.ip;
    	const likes = req.query.like === 'true' ? 1 : 0;

    	//get price(s) 
        if (Array.isArray(ticker)) {
            price1 = getPrice(ticker[0]);
            price2 = getPrice(ticker[1]);
    	} else {
            price = getPrice(ticker);
        }

        //Access mongodb collection by IP
        let stocks = mongoose.model(ip, stockSchema);

        // check if ticker is in database, if not add to database with likes, if it is then just return it
        async function databaseCheck(ticker) {
            let stockObject = await stocks.findOneAndUpdate({stock: ticker}, {likes: likes}, {new: true});
            if (!stockObject) {
                
                return new Promise( (resolve, reject) => {
                    stocks.create({
                    stock: ticker,
                    likes
                    }, (err, savedStock) => {
                        if(err) reject('error in saving new stock');
                        else resolve({
                            stock: savedStock.stock,
                            likes: savedStock.likes
                        })
                    })
                })
            } else {
               
                return ({
                    stock: ticker,
                    likes: stockObject.likes
                });  
            }   
        }

        if (Array.isArray(ticker)) {
            stock1 = await databaseCheck(ticker[0]);
            stock2 = await databaseCheck(ticker[1]);
        } else {
            stock = await databaseCheck(ticker);
        }

        // complete the response object when price(s) come back from API

        if (Array.isArray(ticker)) {
            stock1.rel_likes = (stock1.likes - stock2.likes);

            stock2.rel_likes = (stock2.likes - stock1.likes);
            delete stock1.likes;
            delete stock2.likes;

            let stock1Promise = price1.then( value => {
                
                stock1.price = value
            })
            let stock2Promise = price2.then( value => {
          
                stock2.price = value
            })
            Promise.all([stock1Promise, stock2Promise])
                .then( () => res.json({stockData: [stock1, stock2]}))
                .catch( () => res.send('an error occured'))
        } else {
            price.then( (value) => {
                
                stock.price = value
                res.json({stockData: stock});
            })
            .catch( () => {
            res.send('no such ticker')
            });  
        }
        
               
    });
}
