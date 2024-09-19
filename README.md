

# Climaview

This Weather App allows users to search for real-time weather data for any city, including a 5-day forecast. Users can save favorite cities, view weather details, and enjoy a responsive, dark-mode-supported user interface. The app also includes real-time updates and graphical temperature trend visualization.

## Live Demo
You can view a live demo of the app here: [Climaview](https://climaview-jade.vercel.app/)

## Features

- **Weather Search**: View current weather data (temperature, humidity, wind speed, and weather icon) for any searched city.
- **5-Day Forecast**: Display a 5-day weather forecast for the selected city.
- **Favorites**: Save favorite cities and view weather information for them.
- **State Management**: Use `pinia` or the Composition API for managing app state, with favorite cities stored in local storage.
- **Error Handling**: Display error messages for invalid city names or issues with the weather API.
- **Responsive Design**: Fully responsive interface optimized for both desktop and mobile views.
- **Dark Mode**: Supports dark mode for a better user experience in low-light environments.
- **Graphical Temperature Trends**: Display temperature trends using a charting library (e.g., `chart.js` or `apexcharts`).
- **Real-Time Updates**: Weather information is updated every minute.

## Technologies

- **Vue 3** with Composition API
- **Pinia** for state management
- **Local Storage** to persist favorite cities
- **Weather API** (e.g., OpenWeather API or similar)
- **Charting Library**: For temperature trend graphs (e.g., `chart.js`)
- **SCSS**: For styling with dark mode support
- **Responsive Design**: Mobile-first approach

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your system
- [Vue CLI](https://cli.vuejs.org/guide/installation.html) installed globally

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/atok624/climaview
   ```

2. Navigate into the project directory:

   ```bash
   cd climaview
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file to store your weather API key:

   ```bash
   VUE_APP_WEATHER_API_KEY=your_api_key_here
   ```

### Running the App

1. Start the development server:

   ```bash
   npm run serve
   ```

2. Visit `http://localhost:8080` in your browser to view the app.

### Build for Production

To build the project for production:

```bash
npm run build
```

## Features in Detail

### 1. Weather Data
- Search for any city and retrieve the current weather, including:
  - Temperature
  - Humidity
  - Wind speed
  - Weather icon based on conditions

### 2. 5-Day Forecast
- Display a 5-day weather forecast for the searched city.
- Show daily temperature, weather conditions, and weather icons.

### 3. Favorites Management
- Add cities to a list of favorites.
- Save the list of favorite cities in local storage, so they persist between sessions.
- Quickly view weather data for your favorite cities.

### 4. Error Handling
- Display appropriate error messages for:
  - Invalid city names
  - API connection issues
  - No weather data available

### 5. Responsive Design & Dark Mode
- Ensure the app is responsive on different screen sizes, from mobile to desktop.
- Toggle dark mode for a better experience in low-light settings.

### 6. Temperature Trends
- Use a charting library to display a graphical representation of temperature trends over the next five days.

### 7. Real-Time Updates
- The app automatically updates weather data every minute for the current city.

## State Management

- The app uses **Pinia** or Vue's **Composition API** to handle state.
- The list of favorite cities is stored in **local storage**, ensuring persistence across sessions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

For any issues or inquiries, please contact:

- **Nicholas Amissah**: atok948@gmail.com

---

### Future Improvements

- Implement weather alerts for favorite cities.
- Add support for multiple languages and units (°C/°F).
- Optimize performance for large cities or frequent searches.

---

