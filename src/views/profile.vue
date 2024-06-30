<template>
  <div>
    <h1>Welcome</h1>
    <div v-for="notification in notificationNew" :key="notification.post_id">
      <p>{{ notification.message }}</p>
      <router-link :to="'/post/' + notification.post_id" >go to it</router-link>
    </div>

    <div v-for="notification in ALLNotify" :key="notification.post_id">
      <p>{{ notification.text }}</p>
      <router-link :to="'/post/' + notification.notify_post" >go to it</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'ProfileC',
  data() {
    return {
      notificationNew: [],
      ALLNotify:[],
    };
  },
  computed:{
    ...mapState(['user', 'token']),
  },
  mounted() {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/socket-server/');
    
    Notification.requestPermission()
    console.log(Notification.permission)

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.notificationNew.push(notification);
      // if (Notification.permission == 'granted'){
      //   new Notification(notification.message)
      // }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    this.getNotify()
  },
  methods:{
    getNotify(){
      const headers = {
                    Authorization: `Token ${this.token}`,
                    'Content-type': 'get/json',
                }
      axios.get('https://zkariag.pythonanywhere.com/api/notifications', {headers})
      .then((response)=>{
        this.ALLNotify= response.data
      })
      .catch((error)=>{
        console.error(error)
      })
    }
  }
};
</script>
