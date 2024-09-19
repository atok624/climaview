<template>
  <v-card class="mt-4">
    <v-card-title>Search Weather</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="searchWeather">
        <v-text-field
          v-model="searchQuery"
          label="Enter city name"
          append-icon="mdi-magnify"
          @click:append="searchWeather"
        ></v-text-field>
      </v-form>

      <v-alert v-if="error" type="error" class="mt-1">{{ error }}</v-alert>

      <v-card v-if="currentWeather">
        <v-card-title>
          {{ currentWeather.name }}
          <img
            :src="'http://openweathermap.org/img/wn/' + currentWeather.weather[0].icon + '@2x.png'"
            :alt="currentWeather.weather[0].description"
            class="weather-icon ml-2"
          />
          <v-btn icon @click="addToFavorites(currentWeather.name)" class="ml-2">
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <div class="text-h3">{{ Math.round(currentWeather.main.temp) }}°C</div>
              <div>{{ currentWeather.weather[0].description }}</div>
            </v-col>
            <v-col cols="6">
              <div>Humidity: {{ currentWeather.main.humidity }}%</div>
              <div>Wind: {{ currentWeather.wind.speed }} m/s</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useWeather } from '../composables/useWeather';
import { useFavoriteCities } from '../composables/useFavoriteCities';

const emit = defineEmits(['search']);
const { currentWeather, error, fetchWeather } = useWeather();
const { addCity } = useFavoriteCities();

const searchQuery = ref('');

const searchWeather = () => {
  if (searchQuery.value.trim()) {
    fetchWeather(searchQuery.value);
    emit('search', searchQuery.value); // Emit the city name
  }
};

const addToFavorites = (city) => {
  addCity(city);
};
</script>

<style scoped>
.weather-icon {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>