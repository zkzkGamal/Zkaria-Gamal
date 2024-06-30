<template>
  <section class="s1">
    <div class="main-container">
      <div class="greeting-wrapper">
	<h1 v-once>Hi, I'm {{my_name}}  , <br/> </h1>
	</div>
      <div class="intro-wrapper">
        <headerCom class="aa"/>
        <div class="left-column">
          <img id="profile_pic" src="../assets/me.jpg">
					<h5 style="text-align: center;line-height: 0;margin: 15px;">Personalize Theme</h5>
          <thameOP/>
        </div>
        <div class="right-column">
          <preview/>
        </div>
      </div>
    </div>
  </section>
  <section class="s2">
    <div class="main-container">
      <div class="about-wrapper">
        <aboutme/>
        <socialL/>
      </div>
    </div>
  </section>
  <section class="s1">
    <div class="main-container">
      <h3 class="center">Some of my past projects</h3>
      <div class="post-wrapper">
        <div v-for="(post, index) in posts" :key="post.id">
          <HomeCards 
            v-if="index < 6"
            :title="post.title"
            :id="post.id"
            :sub_heading="post.sub_headline"
            :thumbnail="post.thumbnail"
          />
        </div>
      </div>
      <p class="center">
				<router-link to="/posts" >View More</router-link>
			</p>
    </div>
  </section>
  <section class="s2">
    <div class="main-container" id="contact">
      <contactForm/>
    </div>
  </section>
</template>

<script>
// load all home components
import headerCom from '@/components/global/header.vue'
import thameOP from '@/components/home/thameOpCard.vue'
import preview from '@/components/home/preview.vue'
import aboutme from '@/components/home/about.vue'
import socialL from '@/components/home/socialLink.vue'
import HomeCards from '@/components/home/HomeCards.vue'
import contactForm from '@/components/global/contactForm.vue'
// fetch data 
import axios from 'axios'
import { mapState } from 'vuex';
export default {
  name: 'HomePage',
  components:{
    headerCom ,
    thameOP ,
    preview ,
    aboutme,
    socialL,
    HomeCards,
    contactForm,
  },mounted() {

    const socket = new WebSocket('ws://zkariag.pythonanywhere.com/ws/socket-server/');
    
    Notification.requestPermission()
    console.log(Notification.permission)

    socket.onopen = () => {
      console.log('WebSocket connected');
    };



    // Move the Google Analytics code to the mounted hook
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-47692315-56');
    this.fetchData();
  },data: function(){
    return {
      my_name:'Zkaria Gamal',
      my_img:'../assets/me.jpg',
      posts: [],
    }
  },methods: {
    fetchData (){
      // to gst all posts
      axios
        .get('https://zkariag.pythonanywhere.com//api/posts')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });
    }
  },computed:{
    ...mapState(['user'])
  }
}
</script>

<style scoped>
  .center{
    text-align: center;
  }
</style>

