<template>
  <div class="home">
      <div id="map-wrap" style="height: 100%;position:relative">

        <div style="padding: 9px 0px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 9999;
    background: rgb(255 255 255 / 82%);
">
          <h6 style="       font-weight: 100;  padding-left: 11px;   margin: 0;padding-top: 4px;font-size: 18px;">Detemine A Location In Map To Show Weather</h6>
          <div style="padding-right:10px;">
            <vs-button @click="getWeather()" style="margin: 0;"> Show Weather </vs-button>
          </div>
        </div>


    
        <div class="alert-container" :style="{'padding': alertActive ? '9px 0 10px' : '0'}">
          <vs-alert primary :progress="progress" v-model="alertActive">
            <template #title>
              Weather
            </template>

            <apexchart
            type="area"
            ref="humidity"
            height="230"
            :options="chartOptions"
            :series="series"
            foreColor= "#ccc"
          ></apexchart>

            <div v-if="currentWeatherLocation&&currentWeatherLocation.daily" style="display:flex;    justify-content: space-around;">
              <div v-for="(day,index) in currentWeatherLocation.daily" :key="index">
                <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="">
                <h6 style="    font-size: 20px;margin: 0;"> {{day.weather[0].description}} </h6>

                <template v-if="day && day.temp">
                  <h6 style="margin-bottom: 0;font-size: 16px;margin-top: 11px;font-family: -webkit-pictograph;color: #333;"> {{day.temp.morn}} ° </h6>
                  <h6 style="margin-top: 9px;font-size: 16px;margin-bottom: 5px;color: #333;"> {{day.temp.night}} ° </h6>
                </template>
              </div>
            </div>
            
          </vs-alert>
        </div>

          <l-map @click="getMarker" ref="regionMap" @mousemove="getLatLng" :zoom="zoom" :center="center">
            <l-tile-layer :url="mapUrl" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="marker"></l-marker>
          </l-map>

         


    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


import L from 'leaflet';
// import markerIconPng from "leaflet/dist/images/marker-icon.png"

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  watch: {
   
    alertActive(val) {
      if(val) {
        var interval = setInterval(() => {
          this.progress++
        }, this.time / 100);

        setTimeout(() => {
          this.alertActive = false
          clearInterval(interval)
          this.progress = 0
        }, this.time);
      }
    }
      },
  data(){
    return{



      chartOptions: {
       
         toolbar: {
      autoSelected: "pan",
      show: false
    },
        

        

        
        xaxis: {
      type: 'category',
      categories: ['Today','Day 1', 'Day 2' , 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
     
  },
        yaxis: {
          title: {
            text: "Humidity Degree",
          },
        },
        noData: {
          text: "Loading...",
        },
        colors: ["#00BAEC"],
  stroke: {
    width: 3
  },
  grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    colors: ["#00BAEC"],
    gradient: {
      enabled: true,
      opacityFrom: 0.55,
      opacityTo: 0,
      gradientToColors:["#00BAEC"],
  
    }
    
  },
  markers: {
    size: 5,
    colors: ["#fff"],
    strokeColor: "#00baec",
    strokeWidth: 3
  },
  tooltip: {
    theme: "dark"
  },
      },



      series: [
        {
          data: [],
        },
        {
          data: [],
        },
      ],

      currentWeatherLocation:{},
      alertActive:false,
      time:6000,
      progress: 0,
      url:"https://dark-sky.p.rapidapi.com/",
      headers:{
        'x-rapidapi-key': "8d746b97a1msh0bfa780d06d296cp13fc88jsnb21d5e9d2b9c",
        'x-rapidapi-host': 'dark-sky.p.rapidapi.com'
      },

      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      mapUrl:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      editMarker: L.latLng(47.413220, -1.219482),
      clusterStyle: [
      {
        url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
        width: 56,
        height: 56,
        textColor: "#fff"
      }
    ],
    }
  },
  mounted(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.getCoord);
    }
  },
  methods:{
    getWeather(){
      
      this.getWeatherData()
    },
    getWeatherData(){
      let loading = this.$vs.loading();

      const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/onecall?lang=en&lat=${this.center.lat}&lon=${this.center.lng}&exclude=hourly,minutely&appid=7c12f5d2655dcb4c73a8b996f807510f&units=metric`,
      };

      console.log(this.center)

      this.axios.request(options).then(res => {
        console.log(res.data);
        this.currentWeatherLocation = res.data;

        const sendToBack = {
          method: 'POST',
          url: "https://weather-lazooz.herokuapp.com/api/v1/weather",
          data:{...res.data}
        };

        this.axios.request(sendToBack).then(res2 => {
          console.log(res2)
        })
        

        let series = [];
        this.currentWeatherLocation.daily.forEach(ele => {
          series.push(ele.humidity)
        })

        this.alertActive = !this.alertActive;
        console.log(this.$refs)


        this.$nextTick(() => {
          console.log(this.$refs.regionMap)
          this.$refs.humidity.updateSeries(
            [
              {
                name:"Humidity",
                data: series
              },
            ],
            
        );
        })


        

      }).catch(err => {
        console.log(err)
      }).finally(() => loading.close());
    },
     getCoord(position){
      this.center = L.latLng(position.coords.latitude, position.coords.longitude)
      this.marker = L.latLng(position.coords.latitude, position.coords.longitude)

    },
    getLatLng(e){
      // console.log(e.latlng.lat)
      // console.log(e.latlng.lng)
      this.myLatLng = [e.latlng.lat, e.latlng.lng]
      // console.log(this.myLatLng)
    },
    getMarker(){
      this.marker = L.latLng(this.myLatLng[0], this.myLatLng[1])
      this.center = this.marker;
      console.log(this.marker)
    },
  }
}
</script>
<style lang="scss">
.home{
    height: 99vh;

    .vs-alert__content__text{
      padding-left:0;
    }

    .vs-alert.v-enter-to{
      padding-left: 0 !important;
    }

    .alert-container{
      position: fixed;bottom: 0;width: 100%;    z-index: 999999999999999999;background: #FFF;
    }

    .vs-sidebar-content.reduce .vs-sidebar__item:hover .vs-sidebar__item__text-tooltip {
      opacity: 1;
      left: 60px;
      color: #333;
      z-index: 999999999999999999999999999999;
      /* position: relative; */
  }
}
</style>