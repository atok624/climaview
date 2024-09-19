<template>
  <v-card class="mt-4">
    <v-card-title>Favorite Cities</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addNewCity">
        <v-text-field v-model="newCity" label="Add a new favorite city" append-icon="mdi-plus"
          @click:append="addNewCity"></v-text-field>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-1">{{ error }}</v-alert>
      <v-list>
        <v-list-item v-for="city in favoriteCities" :key="city" @click="viewWeather(city)"
          :class="{ 'selected-city': selectedCity === city }">
          <v-list-item-content>
            <v-list-item-title>{{ city }}</v-list-item-title>
            <div v-if="selectedCity === city && currentWeather?.name === city" class="weather-details">
              <!-- Display detailed weather information -->
              <div class="text-h6">{{ Math.round(currentWeather.main.temp) }}°C</div>
              <div>{{ currentWeather.weather[0].description }}</div>
              <div>Humidity: {{ currentWeather.main.humidity }}%</div>
              <div>Wind: {{ currentWeather.wind.speed }} m/s</div>
            </div>
          </v-list-item-content>
          <template v-slot:append>
            <v-btn icon @click.stop="removeNewCity(city)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>


<script setup>
import { ref } from 'vue';
import { useWeather } from '../composables/useWeather';
import { useFavoriteCities } from '../composables/useFavoriteCities';

const { currentWeather, fetchWeather } = useWeather();
const { favoriteCities, addCity, removeCity } = useFavoriteCities();

const newCity = ref('');
const selectedCity = ref(null);

const viewWeather = async (city) => {
  selectedCity.value = city;
  try {
    await fetchWeather(city);
    
    // Ensure that currentWeather is updated before checking
    if (currentWeather.value && currentWeather.value.name === city) {
      selectedCity.value = city;
    } else {
      // Handle case where currentWeather was not set properly
      throw new Error('Weather data for the selected city is not available.');
    }
  } catch (err) {
    console.error('Error fetching weather data:', err.message || err);
    selectedCity.value = null;
    currentWeather.value = null;
    alert(`Error: ${err.message}. Please check the city name or try again later.`);
  }
};


const addNewCity = async () => {
  const cityName = newCity.value.trim();
  if (cityName) {
    try {
      // Attempt to fetch weather data for the new city to validate it
      await fetchWeather(cityName);
      
      // If the fetch is successful, add the city to the favorites
      if (currentWeather.value && currentWeather.value.name === cityName) {
        addCity(cityName);
        newCity.value = '';
      } else {
        // Handle case where weather data is not set properly
        alert('Invalid city name or weather data not available.');
      }
    } catch (err) {
      // Handle error if fetching weather data fails
      console.error('Error validating city name:', err.message || err);
      alert(`Invalid city name or weather data not available. Please check the city name.`);
    }
  } else {
    // Alert if the city name is empty
    alert('City name cannot be empty.');
  }
};


const removeNewCity = (city) => {
  removeCity(city);
  if (selectedCity.value === city) {
    selectedCity.value = null;
    currentWeather.value = null;
  }
};
</script>
