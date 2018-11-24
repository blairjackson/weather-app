<template>
  <div class="home">
    <div class="bg-img" style="background: url(@/../../assets/rain.jpg)">
    </div>
    <div class="row">
      <div class="col-8 offset-2">
        <div class="input-group mb-3">
          <input v-model="location" @keyup.enter.native="updateLocation" type="text" class="form-control" placeholder="Enter location">
          <div class="input-group-append">
            <button @click="updateLocation" class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
          </div>
        </div>
      </div>
      <div class=" mb-3 col-8 offset-2 text-center" v-if="forecast">
        <div class="card text-white bg-secondary">
          <div class="card-header">Current Weather in {{ address }}</div>
          <div class="card-body">
            <h4 class="card-title">{{ forecast.currently.summary }}</h4>
            <div class="card-text icon-temp">
              <span class="emoji">
                {{ icons[forecast.currently.icon] }}
              </span>
              {{ Math.floor(((forecast.currently.temperature -32) * 5) / 9)}} ˚C
            </div>
            <div class="card-text">
              {{ Math.floor(forecast.currently.precipProbability * 100) }} % chance of percipitation
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <pre>{{forecast}}</pre> -->
  </div>
</template>

<script>
import API from '@/lib/API'

export default {
  name: 'home',
  data () {
    return {
      forecast: null,
      location: localStorage.location || '',
      address: localStorage.address || '',
      icons: {
        'clear-day': '😎',
        'clear-night': '🌈',
        'rain': '☔️',
        'snow': '☃️',
        'sleet': '🍧',
        'wind': '🌬',
        'fog': '🌫',
        'cloudy': '☁️',
        'partly-cloudy-day': '🌥',
        'partly-cloudy-night': '🌃'
      }
    }
  },
  methods: {
    updateLocation () {
      localStorage.location = this.location
      API.getCoordinates(this.location).then(result => {
        this.loadWeather(result.latitude, result.longitude)
      })
    },
    loadWeather (lat, lon) {
      localStorage.lat = lat
      localStorage.lon = lon

      API.getAddress(lat, lon).then(result => {
        this.address = [result.name, result.street].join(' ')
        localStorage.address = this.address
      })
      API.getForecast(lat, lon).then(result => {
        this.forecast = result
      })
    }
  },
  mounted () {
    this.loadWeather(localStorage.lat || '55.9533', localStorage.lat || '3.1883')
  }
};
</script>

<style>
body {
  font-size: 2em;
}
.icon-temp {
  font-size: 2em;
}
.emoji {
  font-size: 2em;
}
.bg-img {
}
</style>
