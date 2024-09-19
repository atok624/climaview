import { ref, computed, onUnmounted } from 'vue';
import axios from 'axios';

const API_KEY = '4374695d9a927c9fdf207e13445f3f4b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeather() {
  const currentWeather = ref(null);
  const forecast = ref(null);
  const loading = ref(false);
  const error = ref(null);
  let updateInterval;

  const fetchWeather = async (city) => {
    loading.value = true;
    error.value = null;

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`),
        axios.get(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`)
      ]);

      currentWeather.value = currentResponse.data;
      forecast.value = forecastResponse.data;

      // Set up interval for real-time updates
      clearInterval(updateInterval);
      updateInterval = setInterval(() => fetchWeather(city), 60000); // Update every minute
    } catch (e) {
      error.value = 'Failed to fetch weather data. Please try again.';
    } finally {
      loading.value = false;
    }
  };

  const temperatureData = computed(() => {
    if (!forecast.value) return [];
    return forecast.value.list.map(item => ({
      time: new Date(item.dt * 1000).toLocaleTimeString(),
      temperature: item.main.temp
    }));
  });

  onUnmounted(() => {
    clearInterval(updateInterval);
  });

  return {
    currentWeather,
    forecast,
    loading,
    error,
    fetchWeather,
    temperatureData
  };
}
