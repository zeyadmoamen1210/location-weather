<template>
  <div>
    <h4 class="header"> History </h4>

    <div class="weather-location" v-for="location in locations" :key="location._id">


      


      <div style="display:flex">
        <div>
          <span style="display: inline-block;
    text-align: left;
    margin-left: 30px;
    padding: 7px;
    background: rgba(var(--vs-primary));
    clear: both;    color: #FFF;
    border-radius: 8px;"> {{location.timezone}} </span>
        </div>

        <span v-if="location.status == 'good'" style="display: inline-block;
    text-align: left;
    margin-left: 7px;
    padding: 7px;
    background: rgba(var(--vs-success));
    clear: both;    color: #FFF;
    border-radius: 8px;"> {{location.status}} </span>
    <span v-else-if="location.status == 'danger'" style="display: inline-block;
    text-align: left;
    margin-left: 7px;
    padding: 7px;
    background: rgba(var(--vs-danger));
    clear: both;    color: #FFF;
    border-radius: 8px;"> {{location.status}} </span>

    <span v-else style="display: inline-block;
    text-align: left;
    margin-left: 7px;
    padding: 7px;
    background: rgba(var(--vs-warn));
    clear: both;    color: #FFF;
    border-radius: 8px;"> {{location.status}} </span>

      </div>

      <!-- <apexchart
            type="area"
            :ref="'humidity'+location._id"
            height="230"
            :options="chartOptions"
            :series="location.series"
            foreColor= "#ccc"
          ></apexchart> -->

            <div v-if="location&&location.daily" style="display:flex;    clear: both;    justify-content: space-around;">
              <div v-for="(day,index) in location.daily" :key="index">
                <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="">
                <h6 style="    font-size: 20px;margin: 0;"> {{day.weather[0].description}} </h6>

                <template v-if="day && day.temp">
                  <h6 style="margin-bottom: 0;font-size: 16px;margin-top: 11px;font-family: -webkit-pictograph;color: #333;"> {{day.temp.morn}} ° </h6>
                  <h6 style="margin-top: 9px;font-size: 16px;margin-bottom: 5px;color: #333;"> {{day.temp.night}} ° </h6>
                </template>
              </div>
            </div>


    </div>
  </div>
</template>

<script>



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
  methods:{
    
  },
  created(){
    let loading = this.$vs.loading()
    this.axios.get(`https://weather-lazooz.herokuapp.com/api/v1/weather`).then(res => {
     
      this.locations = res.data;
      this.locations.forEach(ele => {
        let series = [];
        ele.daily.forEach(ele2 => {
          series.push(ele2.humidity)
        
        })
        ele.series = series;
     
      })
    }).finally(() => loading.close())
  },
  data(){
    return {

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


      locations:[]
    }
  }
}
</script>

<style lang="scss">
.header{
  margin:0;
  font-size: 24px;
      padding-top: 18px;
    padding-bottom: 14px;
}
.weather-location{
  border-bottom: 1px solid #CCC;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>
