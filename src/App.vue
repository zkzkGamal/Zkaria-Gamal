<template>
    <router-view ></router-view>
</template>

<script>
import './assets/default.css'

export default {
  name: 'App',
  mounted(){
    
  },
  data: function (){
    return {
      tagsNames:[]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}input[type="checkbox"]{
  margin: 0 10px;
}.ll{
    margin: 10px 0;
  }
</style>
