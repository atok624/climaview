<template>
  <v-card v-if="weather.forecast" class="mt-4">
    <v-card-title>5-Day Forecast for {{ city }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col v-for="(day, index) in forecastData" :key="index" cols="12" sm="6" md="6">
          <v-card outlined>
            <v-card-title class="text-center">{{ formatDate(day.dt) }}</v-card-title>
            <v-card-text class="text-center">
              <v-icon size="large">{{ getWeatherIcon(day.weather[0].icon) }}</v-icon>
              <div class="text-h5">{{ Math.round(day.main.temp) }}°C</div>
              <div>{{ day.weather[0].description }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, watch, ref, defineProps, onMounted } from 'vue';
import { useWeather } from '../composables/useWeather';

const props = defineProps({
  city: {
    type: String,
    default: '' // Default to an empty string
  }
});

const weather = useWeather();
const defaultCity = 'Accra';
const city = ref(props.city || defaultCity); // Initialize city with default if not provided

const forecastData = computed(() => {
  if (!weather.forecast.value) return [];
  return weather.forecast.value.list.filter((item, index) => index % 8 === 0);
});

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const getWeatherIcon = (iconCode) => {
  const iconMap = {
    '01d': 'mdi-weather-sunny',
    '01n': 'mdi-weather-night',
    '02d': 'mdi-weather-partly-cloudy',
    '02n': 'mdi-weather-night-partly-cloudy',
    '03d': 'mdi-weather-cloudy',
    '03n': 'mdi-weather-cloudy',
    '04d': 'mdi-weather-cloudy',
    '04n': 'mdi-weather-cloudy',
    '09d': 'mdi-weather-pouring',
    '09n': 'mdi-weather-pouring',
    '10d': 'mdi-weather-partly-rainy',
    '10n': 'mdi-weather-night-partly-rainy',
    '11d': 'mdi-weather-lightning',
    '11n': 'mdi-weather-lightning',
    '13d': 'mdi-weather-snowy',
    '13n': 'mdi-weather-snowy',
    '50d': 'mdi-weather-fog',
    '50n': 'mdi-weather-fog'
  };
  return iconMap[iconCode] || 'mdi-weather-cloudy';
};

// Watch for changes in the city prop
watch(() => props.city, (newCity) => {
  if (newCity) {
    city.value = newCity;
  } else {
    city.value = defaultCity;
  }
  weather.fetchWeather(city.value);
}, { immediate: true });

// Fetch weather data on component mount with the default or initial city
onMounted(() => {
  weather.fetchWeather(city.value);
});
</script>

<style scoped>
.v-card-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
