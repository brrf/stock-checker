var unirest = require('unirest');

module.exports = async function getStockPrice (ticker) {
	await unirest.get(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${ticker}`)
		.header("X-RapidAPI-Host", process.env.API_HOST)
		.header("X-RapidAPI-Key", process.env.API_KEY)
		.end(function (result) {
			if (!result) {
				console.log('here')
				return 'no stock';
			} else {
				console.log('here now')
				return result;
			}
		})
}





