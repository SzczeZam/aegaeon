import fetch from "node-fetch";

const api = {
  fetchData: async (url) => {
    let response = {};
    console.log("fetching data from: " + url);
    const userAgent = {
      "User-Agent":
        "a weather passion project. https://github.com/SzczeZam/aegaeon",
    };

    if (url !== "") {
      response = await fetch(url, userAgent);
    }

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return data;
    }
  },

  geocode: async (address) => {
    const webFormatedAddress = encodeURIComponent(
      address.toString().toLowerCase()
    );
    console.log(`geocoding input: ${webFormatedAddress}`);
    const geocodeURL = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${webFormatedAddress}&benchmark=2020&format=json`;
    const data = await api.fetchData(geocodeURL);
    console.log(
      `found Coordinates for: "${data.result.addressMatches[0].matchedAddress}"`
    );
    return data.result.addressMatches[0].coordinates;
  },

  getStation: async (coords) => {
    const lat = coords.x;
    const lon = coords.y;
    const stationURL = `https://api.weather.gov/points/${lon},${lat}`;
    const stationRes = await api.fetchData(stationURL);
    console.log(
      `recieved Station data for: ${stationRes.properties.relativeLocation.properties.city}`
    );
    const link = stationRes.properties.forecast;
    return link;
  },

  getForecast: async (link) => {
    const forecastURL = link;
    const forecastRes = await api.fetchData(forecastURL);
    console.log(`recieved ${forecastRes.properties.periods.length} periods`);
    return forecastRes;
  },

  getForecastPeriods: async (data) => {
    const periodArray = data.properties.periods;
    return periodArray;
  },

  run: async (address) => {
    const coords = await api.geocode(address);
    const link = await api.getStation(coords);
    const forecastData = await api.getForecast(link);
    const forecastPeriods = await api.getForecastPeriods(forecastData);
    return forecastPeriods;
  },
};

// api.geocode("1788 Patricia Dr Clarksville TN").then((coords) => {
//   console.log(`got coords ${coords.x}, ${coords.y}`);
//   api.getStation(coords).then((link) => {
//     console.log(link);
//     api.getForecast(link).then((forecast) => {
//       api.getForecastPeriods(forecast).then((periods) => {
//         console.log(periods);
//       });
//     });
//   });
// });

// api.run("1788 Patricia Dr Clarksville TN").then((periods) => {
//   console.log(periods);
// });

export default api;
