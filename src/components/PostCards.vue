<template>
    <div class="post">
      <img class="thumbnail" :src="thumbnail" />
      <div class="post-preview">
        <h6 class="post-title">{{ title }}</h6>
        <p class="post-intro">{{ subHead }}</p>
  
        <router-link :to="'/post/' + id">read more</router-link>
  
        <div v-if="super1" style="margin: 5px;">
          <router-link class="space" :to="'/updatePost/' + id">Edit</router-link>
          <span class="pASlink" @click="confirmDelete()">Delete</span>
        </div>
  
        <hr />
        <span class="tag" v-for="tag in tags" :key="tag">{{ tagsNames[tag - 12] }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapState } from 'vuex';
  
  export default {
    name: 'PostCards',
    props: ['title', 'subHead', 'thumbnail', 'tags', 'tagsm', 'id'],
    computed: {
      ...mapState(['superuser', 'user', 'token']),
      csrfToken() {
        const cookieVal = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
        if (cookieVal) {
          return cookieVal.split('=')[1];
        }
        return '';
      },
      super1() {
        if (this.user){
          return this.user.is_superuser ? true : false;
        }else{
          return this.superuser? false : false;
        }
      },
    },
    data() {
      return {
        tagsNames: [],
        ii: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios
          .get('http://127.0.0.1:8000/api/tags')
          .then((response) => {
            response.data.forEach((element, i) => {
              this.tagsNames.push(element.name);
              this.ii = i;
            });
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      },
      confirmDelete() {
        let x = window.confirm(`Are you sure you want to delete this post number: ${this.id}`);
        if (x == true) {
          const headers = {
            Authorization: `Token ${this.token}`,
            'Content-type': 'multipart/form-data',
            'X-CSRFToken': this.csrfToken,
          };
          axios
            .delete(`http://127.0.0.1:8000/api/posts/${this.id}`, { headers })
            .then((respone) => {
              console.log(respone);
              alert('Post deleted successfully');
              location.reload();
            })
            .catch((error) => {
              console.warn('Error deleting post', error);
            });
        } else {
          console.log('as you wish bitch');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .space {
    margin: 0 5px;
    border-right: 1px solid;
    padding: 0 5px;
  }
  
  .pASlink {
    color: red;
    cursor: pointer;
  }
  </style>
  