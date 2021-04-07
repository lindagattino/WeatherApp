import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    weather: null,
    forecasts: [],
    latitude: null,
    longitude: null
  },
  reducers: {
    currentWeather: (state, action) => {
      state.weather = action.payload;
    },
    forecastWeather: (state, action) => {
      state.forecasts = action.payload;
    },
    latitudeWeather: (state, action) => {
      state.latitude = action.payload;
    },
    longitudeWeather: (state, action) => {
      state.longitude = action.payload;
    }
  },
});

export const { forecastWeather, currentWeather, latitudeWeather, longitudeWeather } = dataSlice.actions;

export const curWeather = state => state.data.weather;
export const curForecasts = state => state.data.forecasts;
export const curLatitude = state => state.data.latitude;
export const curLongitude = state => state.data.longitude;

export default dataSlice.reducer;
