<template>
  <v-card class="mt-4">
    <v-card-title>Favorite Cities</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addNewCity">
        <v-text-field v-model="newCity" label="Add a new favorite city" append-icon="mdi-plus"
          @click:append="addNewCity"></v-text-field>
      </v-form>
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
      console.error('Weather data for the selected city is not available.');
      selectedCity.value = null;
    }
  } catch (err) {
    console.error('Error fetching weather data:', err);
    selectedCity.value = null;
  }
};

const addNewCity = () => {
  if (newCity.value.trim()) {
    addCity(newCity.value.trim());
    newCity.value = '';
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
