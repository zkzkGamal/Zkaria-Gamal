<template>
  <div class="app-layout">
    <router-view class="page-content"></router-view>
    <FooterCom />
  </div>
</template>

<script>
import './assets/default.css'
import FooterCom from '@/components/global/Footer.vue'

export default {
  name: 'App',
  components: {
    FooterCom
  },
  mounted(){
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/socket-server/');
    
    Notification.requestPermission()
    console.log(Notification.permission)

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      if (Notification.permission == 'granted'){
        new Notification(notification.message)
      }
    };
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}

input[type="checkbox"]{
  margin: 0 10px;
}

.ll{
  margin: 10px 0;
}
</style>
