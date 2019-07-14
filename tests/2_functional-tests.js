/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: 'false'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isObject(res.body, 'body response is an object');
          assert.equal(res.body.stockData.likes, 0);         
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isObject(res.body, 'body response is an object');
          assert.equal(res.body.stockData.likes, 1);         
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData.stock, 'goog');
          assert.isObject(res.body, 'body response is an object');
          assert.equal(res.body.stockData.likes, 1);         
          done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'aapl']})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'goog');
          assert.equal(res.body.stockData[1].stock, 'aapl');
          assert.isObject(res.body, 'body response is an object');
          assert.property(res.body.stockData[0], 'rel_likes', 'the reponse has a rel_likes property');         
          done();
        });
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['goog', 'aapl'], like: 'true'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.stockData[0].stock, 'goog');
          assert.equal(res.body.stockData[1].stock, 'aapl');
          assert.isObject(res.body, 'body response is an object');
          assert.property(res.body.stockData[0], 'rel_likes', 'the reponse needs a rel_likes property');         
          done();
        });
      });
      
    });

});
