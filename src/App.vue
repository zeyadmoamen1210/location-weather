<template>
  <div id="app">
    <Sidebar />
    <div class="page-container">
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->

      <div class="inner-page-container">
      <router-view/>
      </div>
    </div>

    
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  components:{
    Sidebar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
.page-container.Notreduced{
  margin-left: 220px !important;
}
body{
  padding: 0;
  margin: 0;
}
.page-container{
  transition: all 0.25s ease;
    background: #2c4484 !important;
    margin-left: 43px !important;
    padding: 7px;
  .inner-page-container{
    background: #FFF !important;
    // padding: 25px;
    min-height: 98vh;
    
    
  }
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

*{
  font-family: 'Amaranth', sans-serif;
// font-family: 'Audiowide', cursive;
// font-family: 'Economica', sans-serif;
}
</style>
