# MMM-DogBrew [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/fewieden/MMM-ip/master/LICENSE)

Simple module for MagicMirror<sup>2</sup> that utilizes the api.catalog.beer to fetch a random beer

API: https://api.punkapi.com/v2/beers/random (no key needed)


## Example

![](.github/MMM-Brewdog.jpg)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* No other dependencies required
* api.catalog.beer api key 

## Installation

1. Clone this repo: `git clone https://github.com/jsteel715/MMM-Brewdog` into `~/MagicMirror/modules` directory.
2. Create an account at https://catalog.beer/signup and get an API Key
3. Configure your `~/MagicMirror/config/config.js`:
4. Ensure your API Key is added to both the Config and the Brewdog.js file

```
{
    module: 'Brewdog',
    position: 'top_left',
    config: {
        useheader: true,
        header: "Here's a new beer!",
        updateInterval: 60000,
        apiKey: "APIKEYHERE"
    }
},
```

## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `useHeader` | `true` | Boolean for header visibility |
| `header` | `'Brewdog Beers'` | Change to whatever you want |
| `updateInterval` | `60000` | How often until we get another beer |
