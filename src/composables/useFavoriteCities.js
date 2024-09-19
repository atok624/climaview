// src/composables/useFavoriteCities.js
import { ref, watch } from 'vue';

const favoriteCities = ref([]);

export function useFavoriteCities() {
  const addCity = (city) => {
    if (!favoriteCities.value.includes(city)) {
      favoriteCities.value.push(city);
    }
  };

  const removeCity = (city) => {
    favoriteCities.value = favoriteCities.value.filter(c => c !== city);
  };

  const loadFavoriteCities = () => {
    const savedCities = localStorage.getItem('favoriteCities');
    if (savedCities) {
      favoriteCities.value = JSON.parse(savedCities);
    }
  };

  const saveFavoriteCities = () => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities.value));
  };

  // Load favorite cities when the composable is first used
  loadFavoriteCities();

  // Save favorite cities whenever the list changes
  watch(favoriteCities, saveFavoriteCities, { deep: true });

  return {
    favoriteCities,
    addCity,
    removeCity
  };
}