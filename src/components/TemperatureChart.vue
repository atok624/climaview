<template>
  <v-card class="mt-4">
    <v-card-title>Temperature Trend for {{ city }}</v-card-title>
    <v-card-text>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="chartData.labels.length" style="height: 300px;">
          <Line :data="chartData" :options="chartOptions" />
        </div>
        <div v-else>No data available. Please enter a valid city name and fetch the data.</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';
import { useWeather } from '../composables/useWeather';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);

const props = defineProps(['city']); // Accept city as a prop
const weather = useWeather();
const loading = ref(false);
const error = ref(null);

watch(() => props.city, (newCity) => {
  if (newCity) {
    fetchWeatherForCity(newCity); // Fetch weather when city changes
  }
});

const fetchWeatherForCity = (city) => {
  if (city.trim()) {
    weather.fetchWeather(city.trim());
  }
};

const chartData = computed(() => {
  const temperatures = weather.temperatureData.value.map(data => data.temperature);
  return {
    labels: weather.temperatureData.value.map(data => data.time),
    datasets: [
      {
        label: 'Temperature (°C)',
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        data: temperatures,
        fill: false,
      }
    ]
  };
});

const chartOptions = computed(() => {
  const temperatures = weather.temperatureData.value.map(data => data.temperature);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);

  return {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)'
        },
        min: Math.floor(minTemp - 5),
        max: Math.ceil(maxTemp + 5)
      }
    }
  };
});

onMounted(() => {
  if (props.city) {
    fetchWeatherForCity(props.city); // Fetch data for initial city
  }
});
</script>