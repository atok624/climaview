<template>
  <v-app :theme="theme">
    <v-app-bar>
      <v-app-bar-title>Weather Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme" icon>
        <v-icon>{{ theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="6">
            <WeatherSearch @search="fetchCityWeather" />
          </v-col>
          <v-col cols="6">
            <FavoriteCities />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <WeatherForecast :city="city" />
          </v-col>
          <v-col cols="6">
            <TemperatureChart :city="city" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import WeatherSearch from './components/WeatherSearch.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import FavoriteCities from './components/FavoriteCities.vue';
import TemperatureChart from './components/TemperatureChart.vue';

const theme = ref('light');
const city = ref(''); // Declare city as a reactive reference

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

const fetchCityWeather = (cityName) => {
  city.value = cityName; // Update the city value
};
</script>