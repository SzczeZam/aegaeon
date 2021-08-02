import { useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";

const censusGeocode = async (e) => {

  const webFormatedAddress = encodeURIComponent(e)
  const geocodeURL = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${webFormatedAddress}&benchmark=2020&format=json`
  const data = await fetchData(geocodeURL)

  return data
}

function Search(props) {

  const setResult = props.setResult;

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleQuery = async (e) => {
    e.preventDefault();
    const coords = censusGeocode(e)
    const coordData = await fetchData(`https://api.weather.gov/points/${coords}`);
    const weatherData = await fetchData(coordData.properties.forecast);
    const data = weatherData.properties.periods.map((period) => {
      return ([period.name, period.shortForecast])

    })
    return await setResult(data)
  }

  const fetchData = async (url) => {
    let response = {};
    const userAgent = {
      "User-Agent": "a weather passion project.",
    }

    if (searchTerm !== "") {
      response = await fetch(url, userAgent);
    }

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return data
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleQuery}>
        <TextField
          id="outlined-basic"
          label="Weather Maybe"
          variant="outlined"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <button type="submit">

                </button>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}

export default Search;