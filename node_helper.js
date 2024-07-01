const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getBeers: function(apiKey) {
        const url = "https://api.catalog.beer/beer";
        console.log("Fetching beers from API...");
        request({
            url: url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': apiKey
            }
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                console.log("Beers fetched successfully: " + JSON.stringify(data));
                if (data.data && data.data.length > 0) {
                    const randomBeer = data.data[Math.floor(Math.random() * data.data.length)];
                    this.getBeerDetails(randomBeer.id, apiKey);
                } else {
                    console.error("No beers available");
                    this.sendSocketNotification('NO_BEERS_AVAILABLE');
                }
            } else {
                console.error("API call to get beers failed:", error, response.statusCode);
            }
        });
    },

    getBeerDetails: function(beerId, apiKey) {
        const url = `https://api.catalog.beer/beer/${beerId}`;
        console.log("Fetching details for beer ID: " + beerId);
        request({
            url: url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': apiKey
            }
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const beerDetails = JSON.parse(body);
                console.log("Beer details fetched successfully for: " + beerId);
                this.sendSocketNotification('BEER_DETAILS_RESULT', beerDetails);
            } else {
                console.error("API call to get beer details failed:", error, response.statusCode);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_BEERS') {
            this.getBeers(payload.apiKey);
        }
    }
});
