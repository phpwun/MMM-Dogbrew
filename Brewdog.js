Module.register("Brewdog", {
    defaults: {
        useHeader: true,
        header: "Random Beers",
        maxWidth: "100%",
        animationSpeed: 3000,
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 30000,
        apiKey: "API-KEY-HERE", // Plain API key
    },

    getScripts: function() {
        return [];
    },

    getStyles: function() {
        return ["Brewdog.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.config.apiKey = 'Basic ' + btoa(this.config.apiKey + ':');
        this.scheduleUpdate();
        Log.info("Brewdog module started with API key: " + this.config.apiKey);
    },

    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;
    
        if (!this.loaded) {
            wrapper.innerHTML = "Loading beer data...";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }
    
        var beerDetails = document.createElement("div");
        beerDetails.className = "beer-details";
    
        if (this.beer) {
            this.createDetailLine(beerDetails, "Beer Name", this.beer.name);
            this.createDetailLine(beerDetails, "Style", this.beer.style);
            this.createDetailLine(beerDetails, "ABV", this.beer.abv + "%");
            this.createDetailLine(beerDetails, "Brewer", this.beer.brewer?.name || "Unknown Brewer");
            // Check if description is null and handle accordingly
            this.createDetailLine(beerDetails, "Description", this.beer.description || "Not available");
            // Check if URL is null and display brewer URL if beer URL is not available
            this.createDetailLine(beerDetails, "URL", this.beer.url || this.beer.brewer?.url || "Not available");
        } else {
            beerDetails.innerHTML = "No beer data available";
            beerDetails.classList.add("bright", "light", "small");
        }
    
        wrapper.appendChild(beerDetails);
        return wrapper;
    },    
    
    createDetailLine: function(container, title, value) {
        var detailDiv = document.createElement("div");
        detailDiv.className = "xsmall bright";
        detailDiv.innerHTML = title + ": " + (value || "Not available");
        container.appendChild(detailDiv);
        Log.info(title + ": " + (value || "Not available"));
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.sendSocketNotification('GET_BEERS', {
                apiKey: this.config.apiKey
            });
            Log.info("Scheduled beer update sent.");
        }, this.config.updateInterval);
        this.sendSocketNotification('GET_BEERS', {
            apiKey: this.config.apiKey
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "BEER_DETAILS_RESULT") {
            Log.info("Beer details received: " + JSON.stringify(payload));
            this.beer = payload;
            this.loaded = true;
            this.updateDom(this.config.animationSpeed);
        }
    }
});
