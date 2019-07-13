var unirest = require('unirest');

module.exports = function getPrice (ticker) {
	console.log('fetching price')
    return new Promise( (resolve, reject) => {
        unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${ticker}`)
            .header("X-RapidAPI-Host", process.env.API_HOST)
            .header("X-RapidAPI-Key", process.env.API_KEY)
            .end(function (result) {
            	try {
            		resolve(result.body.quoteResponse.result[0].regularMarketPrice);
            	}
            	catch {
					reject(result)
				} 
       		})
    })
};









